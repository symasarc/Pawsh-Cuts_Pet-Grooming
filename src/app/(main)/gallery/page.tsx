
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BeforeAfterCard } from '@/components/gallery/before-after-card';
import { Card, CardContent } from '@/components/ui/card';
import { ImageModal } from '@/components/gallery/image-modal';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || { id: '', imageUrl: '', description: '', imageHint: '' };

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  const salonImage1 = getImage('salon-1');
  const salonImage2 = getImage('salon-2');
  
  const beforeAfters = [
    { before: getImage('dog-before-1'), after: getImage('dog-after-1') },
    { before: getImage('cat-before-1'), after: getImage('cat-after-1') },
    { before: getImage('dog-before-2'), after: getImage('dog-after-2') },
  ];

  const moments = ['moment-1', 'moment-2', 'moment-3', 'moment-4'].map(getImage);

  return (
    <>
      <div className="container py-12 md:py-20">
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 text-primary">Salonumuz</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <button onClick={() => setSelectedImage({ src: salonImage1.imageUrl, alt: salonImage1.description })} className="relative h-80 rounded-lg overflow-hidden shadow-lg group focus:outline-none focus:ring-4 focus:ring-primary">
              <Image 
                src={salonImage1.imageUrl} 
                alt={salonImage1.description} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300" 
                data-ai-hint={salonImage1.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-0 left-0 bg-black/40 text-white p-4 rounded-tr-lg">
                <p className="font-semibold">Hijyenik ve ferah ortam</p>
              </div>
            </button>
            <button onClick={() => setSelectedImage({ src: salonImage2.imageUrl, alt: salonImage2.description })} className="relative h-80 rounded-lg overflow-hidden shadow-lg group focus:outline-none focus:ring-4 focus:ring-primary">
              <Image 
                src={salonImage2.imageUrl} 
                alt={salonImage2.description} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={salonImage2.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
               <div className="absolute bottom-0 left-0 bg-black/40 text-white p-4 rounded-tr-lg">
                <p className="font-semibold">Dostunuz için konforlu alanlar</p>
              </div>
            </button>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-center mb-4 text-primary">Öncesi &amp; Sonrası</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Patili dostlarınızın inanılmaz değişimlerine tanık olun. Kaydırarak farkı görün!</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfters.map((item, index) => (
              <BeforeAfterCard
                key={index}
                before={{ src: item.before.imageUrl, alt: item.before.description, hint: item.before.imageHint }}
                after={{ src: item.after.imageUrl, alt: item.after.description, hint: item.after.imageHint }}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-center mb-4 text-primary">Bakım Anları</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Her dokunuşta sevgi, her kesimde profesyonellik.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {moments.map((moment, index) => (
              <Card key={index} className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={moment.imageUrl}
                      alt={moment.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={moment.imageHint}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className="absolute bottom-3 left-3 text-white text-sm font-medium">{moment.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <ImageModal 
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
