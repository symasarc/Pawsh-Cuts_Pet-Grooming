'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function ImageWithSkeleton(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative", props.className)}>
      {isLoading && <Skeleton className="absolute inset-0" />}
      <Image
        {...props}
        className={cn(props.className, 'transition-opacity duration-300', isLoading ? 'opacity-0' : 'opacity-100')}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
