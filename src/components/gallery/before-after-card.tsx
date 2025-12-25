"use client";

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BeforeAfterCardProps {
  before: { src: string; alt: string, hint: string };
  after: { src: string; alt: string, hint: string };
}

export function BeforeAfterCard({ before, after }: BeforeAfterCardProps) {
  const [dividerPosition, setDividerPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let newDividerPosition = (x / rect.width) * 100;
    if (newDividerPosition < 0) newDividerPosition = 0;
    if (newDividerPosition > 100) newDividerPosition = 100;
    setDividerPosition(newDividerPosition);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const handleMouseMove = (me: MouseEvent) => {
      handleMove(me.clientX);
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const handleTouchMove = (te: TouchEvent) => {
      handleMove(te.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      ref={containerRef}
      className="group relative w-full aspect-square rounded-lg overflow-hidden select-none cursor-ew-resize shadow-lg"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - dividerPosition}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          data-ai-hint={before.hint}
        />
        <Badge variant="secondary" className="absolute top-3 left-3 z-10 bg-secondary/80 backdrop-blur-sm">Öncesi</Badge>
      </div>

      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 0 0 ${dividerPosition}%)` }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          data-ai-hint={after.hint}
        />
        <Badge className="absolute top-3 right-3 z-10 bg-success/80 backdrop-blur-sm text-success-foreground">Sonrası</Badge>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-sm cursor-ew-resize z-20"
        style={{ left: `${dividerPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-1 shadow-md">
          <ChevronLeft className="h-4 w-4 text-gray-700" />
          <ChevronRight className="h-4 w-4 text-gray-700 -ml-2" />
        </div>
      </div>
    </div>
  );
}
