
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PawPrint, Scissors, Sparkles } from 'lucide-react';
import { BeforeAfterCard } from '@/components/gallery/before-after-card';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || { imageUrl: '', description: '', imageHint: '' };

export default function HomePage() {
  const heroImage = getImage('happy-dog');
  const beforeAfters = [
    { before: getImage('dog-before-1'), after: getImage('dog-after-1') },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary/10 paw-pattern-bg">
        <div className="container grid md:grid-cols-2 items-center gap-12 py-12 md:py-24">
          <div className="flex flex-col items-start text-center md:text-left">
            <h1 className="font-headline text-4xl md:text-6xl text-primary mb-4">
              Patili Dostunuzun <br />
              <span className="text-secondary">Stil ve Konfor</span> Durağı
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Pawsh Cuts'ta her dokunuşta sevgi, her kesimde profesyonellik var. Minik dostlarınız için en iyi bakım deneyimini sunuyoruz.
            </p>
            <div className="flex gap-4 mx-auto md:mx-0">
              <Button asChild size="lg" className="font-bold">
                <Link href="/appointment">
                  <Scissors className="mr-2" />
                  Hemen Randevu Al
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link href="/pricing">
                  <Sparkles className="mr-2" />
                  Fiyatları Gör
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-full w-full max-w-md mx-auto md:max-w-none">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            )}
            <div className="absolute -bottom-4 -left-4 bg-accent p-4 rounded-full shadow-lg">
              <PawPrint className="w-8 h-8 text-accent-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-4 text-primary">Hizmetlerimiz</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Dostunuzun ihtiyaçlarına özel, kapsamlı bakım çözümleri sunuyoruz.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Scissors className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Profesyonel Tıraş</h3>
              <p className="text-muted-foreground">Irk standartlarına uygun, modern ve konforlu tüy kesimi.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
                <PawPrint className="mx-auto h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-2">Yıkama & Bakım</h3>
                <p className="text-muted-foreground">Cilt ve tüy sağlığını koruyan özel şampuanlarla derinlemesine temizlik.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg shadow-md">
              <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Pati Bakımı</h3>
              <p className="text-muted-foreground">Tırnak kesimi, pati temizliği ve nemlendirici bakımlar.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Before/After Section */}
      <section className="py-16 md:py-24 bg-primary/10">
          <div className="container">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-headline text-center mb-4 text-primary">İnanılmaz Değişimler</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">Tek bir örnekle bile farkı görün. Daha fazlası için galerimize göz atın!</p>
              </div>
              <div className="max-w-md mx-auto">
                 {beforeAfters.map((item, index) => (
                    <BeforeAfterCard
                      key={index}
                      before={{ src: item.before.imageUrl, alt: item.before.description, hint: item.before.imageHint }}
                      after={{ src: item.after.imageUrl, alt: item.after.description, hint: item.after.imageHint }}
                    />
                  ))}
              </div>
              <div className="text-center mt-12">
                  <Button asChild size="lg" variant="secondary">
                      <Link href="/gallery">
                          <PawPrint className="mr-2" />
                          Galeriyi Keşfet
                      </Link>
                  </Button>
              </div>
          </div>
      </section>
    </div>
  );
}
