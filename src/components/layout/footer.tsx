import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '../logo';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pawsh Cuts. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
