
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

export default function Header() {
  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#work", label: "Work" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent text-white">
      <div className="container flex h-20 items-center justify-between">
         <div className="flex-1">
           <Link href="/" className="text-lg font-bold pl-2.5">
             Umair Sarwar Ansari
           </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 justify-end">
          <Button asChild variant="ghost">
            <Link href="/admin">Admin</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background text-foreground border-r-white/10">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                   <span className="text-2xl font-bold">Umair Sarwar Ansari</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-lg">
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/admin" className="text-lg">Admin</Link>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
