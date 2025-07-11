
import Header from '@/components/header';
import PortfolioGrid from '@/components/portfolio-grid';
import ContactForm from '@/components/contact-form';
import ResumeSection from '@/components/resume-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">
        <section id="hero" className="relative flex flex-col items-center justify-center h-screen min-h-[700px] text-center px-4 -mt-20">
          <div className="absolute bottom-8 left-8 w-8 h-8 rounded-full bg-blue-600 border-2 border-white"></div>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              Trust nothing, test everything.
            </h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto">
              A true QA doesn&apos;t fear AI — we test it, break it, and make it better. If it can’t handle scrutiny, it’s not ready for release.
            </p>
            <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base">
                <Link href="#contact">Let&apos;s Capture Together</Link>
            </Button>
          </div>
        </section>

        <section id="work" className="bg-secondary/20">
          <PortfolioGrid />
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
