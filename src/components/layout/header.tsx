'use client';

import { Menu, PawPrint } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '../logo';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/gallery', label: 'Galerimiz' },
  { href: '/pricing', label: 'Fiyatlarımız' },
  { href: '/appointment', label: 'Randevu Al' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all',
        isScrolled
          ? 'border-border/60 bg-background/80 backdrop-blur-lg'
          : 'bg-background'
      )}
    >
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === href ? 'text-primary' : 'text-foreground/80'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-10">
              <Logo className="mb-4" />
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'transition-colors hover:text-primary',
                    pathname === href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
