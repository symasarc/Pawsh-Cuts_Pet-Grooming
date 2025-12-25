import React from 'react';
import { Dog, Cat, PawPrint, Sparkles, Bone, Scissors } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const dogServices = {
  title: 'Köpek Bakımı',
  icon: Dog,
  accent: 'bg-primary',
  services: [
    { name: 'Köpek Tıraşı (Küçük Irk)', price: '700 ₺' },
    { name: 'Köpek Tıraşı (Orta Irk)', price: '900 ₺', popular: true },
    { name: 'Köpek Tıraşı (Büyük Irk)', price: '1200 ₺' },
    { name: 'Yıkama & Kurutma', price: '500 ₺' },
  ],
};

const catServices = {
  title: 'Kedi Bakımı',
  icon: Cat,
  accent: 'bg-secondary',
  services: [
    { name: 'Kedi Tıraşı (Anestezisiz)', price: '800 ₺' },
    { name: 'Tüy Bakımı & Tarama', price: '600 ₺' },
    { name: 'Yıkama & Kurutma (Gerekliyse)', price: '750 ₺' },
  ],
};

const extraServices = {
  title: 'Ek Hizmetler',
  icon: Sparkles,
  accent: 'bg-accent',
  services: [
    { name: 'Tırnak Kesimi', price: '200 ₺' },
    { name: 'Kulak Temizliği', price: '150 ₺' },
    { name: 'Pati Bakımı', price: '250 ₺' },
    { name: 'Tüy Tarama & Bakım', price: '400 ₺' },
  ],
};

const PricingCard = ({ data }: { data: typeof dogServices }) => {
  const Icon = data.icon;
  return (
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className={`p-6 ${data.accent}`}>
        <div className="flex items-center gap-4">
          <Icon className="w-8 h-8 text-white" />
          <h3 className="font-headline text-2xl text-white">{data.title}</h3>
        </div>
      </div>
      <ul className="p-6 space-y-4 flex-grow">
        {data.services.map((service, index) => (
          <li key={index} className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-foreground/80">{service.name}</span>
              {service.popular && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  En Popüler
                </Badge>
              )}
            </div>
            <p className="font-bold text-lg text-primary shrink-0">
              {service.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function PricingPage() {
  return (
    <div className="paw-pattern-bg">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-3">
            Fiyatlarımız <PawPrint className="w-10 h-10" />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minik dostlarınız için şeffaf ve adil fiyatlar sunuyoruz.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <PricingCard data={dogServices} />
            <PricingCard data={catServices} />
            <PricingCard data={extraServices} />
          </div>
        </div>

        <div className="mt-12 bg-success/10 border-l-4 border-success text-success-foreground p-6 rounded-lg max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <PawPrint className="w-6 h-6 text-success mt-1" />
            <div>
              <h4 className="font-bold mb-1">Önemli Bilgilendirme</h4>
              <p className="text-sm">
                Fiyatlar, evcil hayvanın tüy durumu, ırkı, boyutu ve özel ihtiyaçlarına göre değişiklik gösterebilir. Detaylı bilgi için lütfen bizimle iletişime geçin.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center bg-accent/20 p-8 rounded-2xl">
            <h3 className="font-headline text-2xl md:text-3xl text-accent-foreground mb-4">Hemen randevu al, patili dostunu mutlu edelim!</h3>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <Link href="/appointment">
                    <Scissors className="mr-2 h-5 w-5" /> Randevu Oluştur
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
