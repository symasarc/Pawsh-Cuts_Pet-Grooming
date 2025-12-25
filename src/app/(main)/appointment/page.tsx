
'use client';

import dynamic from 'next/dynamic';
import { Scissors } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AppointmentForm = dynamic(
  () => import('@/components/appointment/appointment-form').then(mod => mod.AppointmentForm),
  { 
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <div className="space-y-4 pt-4">
          <Skeleton className="h-10 w-1/3 mx-auto" />
          <Skeleton className="h-[400px] w-full max-w-sm mx-auto" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    ),
  }
);

export default function AppointmentPage() {
  return (
    <div className="paw-pattern-bg min-h-[calc(100vh-theme(spacing.16))]">
      <div className="container flex items-center justify-center py-12 md:py-20">
        <Card className="w-full max-w-2xl shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary rounded-full p-3 w-fit mb-4">
              <Scissors className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Randevu Alın</CardTitle>
            <CardDescription className="text-lg">
              Patili dostunuz için bir bakım seansı planlayın!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
