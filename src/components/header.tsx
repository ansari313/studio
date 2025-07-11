
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

export default function Header() {
  const navLinks = [
    { href: "#hero", label: "Home", active: true },
    { href: "#work", label: "About Me" },
    { href: "#resume", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
      <div className="container flex h-20 items-center">
        <div className="mr-auto flex-1">
           <Link href="/" className="flex items-center space-x-2">
             <span className="text-2xl font-bold text-zinc-900">Petrix.</span>
           </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1 justify-center">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={link.active ? 'text-red-500' : 'text-zinc-900'}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 justify-end">
          <Button asChild className="bg-zinc-900 text-white hover:bg-zinc-700">
            <Link href="/admin">Let&apos;s Talk</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                   <span className="text-2xl font-bold text-zinc-900">Petrix.</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className={link.active ? 'text-red-500' : 'text-zinc-900'}>
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/admin">Admin</Link>
                </nav>
                 <Button asChild className="bg-zinc-900 text-white hover:bg-zinc-700 mt-6">
                    <Link href="/admin">Let&apos;s Talk</Link>
                </Button>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
