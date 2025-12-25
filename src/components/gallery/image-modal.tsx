
'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageModalProps {
  image: { src: string; alt: string } | null;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-0 shadow-none">
        {image && (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain rounded-lg"
            />
             <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute -top-2 -right-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/75 h-9 w-9"
                aria-label="Close image viewer"
            >
                <X className="h-5 w-5 text-foreground" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
