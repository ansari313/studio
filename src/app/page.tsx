
import Header from '@/components/header';
import PortfolioGrid from '@/components/portfolio-grid';
import ContactForm from '@/components/contact-form';
import ResumeSection from '@/components/resume-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const socialIcons = [
    {
        name: 'GitHub',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
        ),
    },
    {
        name: 'LinkedIn',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        ),
    },
    {
        name: 'Gmail',
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        ),
    },
];

export default function Home() {
  const repeatedIcons = Array(5).fill(socialIcons).flat();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">
        <section id="hero" className="relative flex flex-col items-center justify-center h-screen min-h-[700px] text-center px-4 -mt-20">
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-serif leading-tight animate-pop-in">
              Trust nothing, test everything.
            </h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto animate-pop-in [animation-delay:200ms]">
              A true QA doesn&apos;t fear AI — we test it, break it, and make it better. If it can’t handle scrutiny, it’s not ready for release.
            </p>
            <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base animate-pop-in [animation-delay:400ms]">
                <Link href="#contact">Let&apos;s Capture Together</Link>
            </Button>
          </div>
        </section>

        <section id="work" className="bg-secondary/20 animate-slide-in-up">
          <PortfolioGrid />
        </section>

        <section className="py-16 bg-background overflow-hidden">
            <div className="relative flex animate-marquee">
                <div className="flex min-w-full shrink-0 items-center justify-around gap-12">
                {repeatedIcons.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 text-muted-foreground">
                       {item.icon}
                    </div>
                ))}
                </div>
                 <div aria-hidden="true" className="flex min-w-full shrink-0 items-center justify-around gap-12">
                {repeatedIcons.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 text-muted-foreground">
                       {item.icon}
                    </div>
                ))}
                </div>
            </div>
        </section>

        <ResumeSection />

        <section id="contact" className="py-24 bg-secondary/20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">Get In Touch</h2>
                    <p className="text-muted-foreground mt-2">Have a project in mind? Let&apos;s talk.</p>
                </div>
                <ContactForm />
            </div>
        </section>
      </main>
      <footer className="py-6 border-t border-white/10 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FolioFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
