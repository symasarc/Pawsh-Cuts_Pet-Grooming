import type { Metadata } from 'next';
import './globals.css';
import { Lora, Lexend } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

const fontBody = Lora({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Lexend({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Pawsh Cuts',
  description: 'Cute & stylish pet grooming for your furry friends.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
