'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Loader2, PartyPopper} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {DateTimePicker} from './DateTimePicker';
import {useFirebase, useUser} from '@/firebase';
import {addDoc, collection, Timestamp} from 'firebase/firestore';

const appointmentSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır.'),
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
  phone: z.string().min(10, 'Telefon numarası en az 10 karakter olmalıdır.'),
  petName: z
    .string()
    .min(2, 'Evcil hayvanınızın adı en az 2 karakter olmalıdır.'),
  petType: z.enum(['dog', 'cat'], {
    required_error: 'Lütfen evcil hayvanınızın türünü seçin.',
  }),
  service: z.string({required_error: 'Lütfen bir hizmet seçin.'}),
  dateTime: z
    .object(
      {
        date: z.date({required_error: 'Lütfen bir tarih seçin.'}),
        time: z
          .string({required_error: 'Lütfen bir saat seçin.'})
          .min(1, 'Lütfen bir saat seçin.'),
      },
      {required_error: 'Lütfen randevu tarihi ve saati seçin.'}
    )
    .refine(val => val.date && val.time, {
      message: 'Lütfen randevu tarihi ve saati seçin.',
    }),
});

const services = [
  'Köpek Tıraşı',
  'Kedi Tıraşı',
  'Yıkama & Kurutma',
  'Tırnak Kesimi',
  'Tüy Bakımı',
];

export function AppointmentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {toast} = useToast();
  const {firestore} = useFirebase();
  const {user} = useUser();

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      petName: '',
      dateTime: {
        time: '',
      },
    },
  });

  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    setIsLoading(true);

    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Hata',
        description: 'Veritabanı bağlantısı kurulamadı. Lütfen tekrar deneyin.',
      });
      setIsLoading(false);
      return;
    }

    const {date, time} = values.dateTime;
    const hour = parseInt(time.split(':')[0]);
    const appointmentDateTime = new Date(date);
    appointmentDateTime.setHours(hour, 0, 0, 0);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const firestoreData = {
      customerId: user.uid,
      customerName: values.name,
      customerEmail: values.email,
      customerPhone: values.phone,
      petName: values.petName,
      petType: values.petType,
      service: values.service,
      appointmentDateTime: Timestamp.fromDate(appointmentDateTime),
      appointmentDate: formattedDate,
      appointmentTime: time,
      status: 'scheduled',
    };

    const webhookData = {
      name: values.name,
      petName: values.petName,
      email: values.email,
      phone: values.phone,
      service: values.service,
      date: formattedDate,
      time: time,
    };

    try {
      // 1. Save to Firestore
      const appointmentsColRef = collection(firestore, 'appointments');
      await addDoc(appointmentsColRef, firestoreData);

      // 2. Send to Webhook directly from the client
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });

        if (!response.ok) {
          // Even if webhook fails, appointment is in Firestore. Log it.
          console.error(
            `Webhook request failed with status ${response.status}`
          );
          // We can decide to still show success to the user as the appointment IS booked.
        }
      } else {
        console.warn('N8N_WEBHOOK_URL is not configured.');
      }

      // --- Success ---
      setIsSuccess(true);
      toast({
        title: 'Randevunuz başarıyla oluşturuldu 🐾',
        description: `Sevgili ${values.petName} için randevunuzu aldık.`,
      });
      form.reset();
    } catch (error) {
      console.error('Failed to create appointment:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Bir şeyler ters gitti.',
        description:
          'Randevunuzu oluştururken bir sorunla karşılaştık. Lütfen daha sonra tekrar deneyin.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-10">
        <PartyPopper className="h-16 w-16 mx-auto text-success mb-4 animate-bounce" />
        <h3 className="font-headline text-2xl text-primary mb-2">Harika!</h3>
        <p className="text-muted-foreground">
          Randevunuz başarıyla oluşturuldu. En kısa zamanda sizinle iletişime
          geçeceğiz.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false);
            form.reset();
          }}
          className="mt-6"
        >
          Yeni Randevu Al
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 relative group"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Adınız Soyadınız</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petName"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Patili Dostunuzun Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Fındık" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>E-posta Adresiniz</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Telefon Numaranız</FormLabel>
                <FormControl>
                  <Input placeholder="555 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <FormField
            control={form.control}
            name="petType"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Dostunuzun Türü</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Köpek / Kedi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dog">Köpek</SelectItem>
                    <SelectItem value="cat">Kedi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Hizmet Seçimi</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Almak istediğiniz hizmet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="dateTime"
            render={({field}) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="w-full text-left md:text-center font-bold text-lg mb-2">
                  Randevu Tarihi ve Saati
                </FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Lütfen uygun bir tarih ve saat seçin.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading || !user}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              'Randevuyu Onayla'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
