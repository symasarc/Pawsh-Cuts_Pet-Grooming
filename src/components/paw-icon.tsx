import { PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

type PawIconProps = {
  className?: string;
};

export function PawIcon({ className }: PawIconProps) {
  return (
    <PawPrint
      className={cn(
        'pointer-events-none absolute -top-4 -right-4 z-10 text-accent/50',
        className
      )}
    />
  );
}
