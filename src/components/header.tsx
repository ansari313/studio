import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-accent" />
            <span className="font-bold">FolioFlow</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#work">Work</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Bot className="h-6 w-6 text-accent" />
                  <span className="font-bold">FolioFlow</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                    <Link href="#work">Work</Link>
                    <Link href="#contact">Contact</Link>
                    <Link href="/admin">Admin</Link>
                </nav>
              </SheetContent>
            </Sheet>
             <Link href="/" className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-accent" />
                <span className="font-bold">FolioFlow</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center">
            <Button asChild variant="outline">
              <Link href="/admin">Admin Panel</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
