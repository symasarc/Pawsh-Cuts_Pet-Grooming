import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-2 text-2xl font-bold text-foreground font-headline',
        className
      )}
    >
      <PawPrint className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-[-15deg] group-hover:scale-110" />
      <span>Pawsh Cuts</span>
    </Link>
  );
}
