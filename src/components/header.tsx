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
            <Link href="#resume">Resume</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
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
                    <Link href="#resume">Resume</Link>
                    <Link href="#contact">Contact</Link>
                    <Link href="/admin">Admin</Link>
                </nav>
              </SheetContent>
            </Sheet>
             <Link href="/" className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-accent" />
                <span className="font-bold">FolioFlow</span>
            </Link>
            <Button asChild variant="outline" size="icon">
              <Link href="/admin">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v.4a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h4.44a2 2 0 0 0 2-2v-.4a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                <span className="sr-only">Admin Panel</span>
              </Link>
            </Button>
        </div>
        <div className="hidden md:flex flex-1 justify-end">
          <nav>
            <Button asChild variant="outline">
              <Link href="/admin">Admin Panel</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
