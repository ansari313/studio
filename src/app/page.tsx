
import Header from '@/components/header';
import PortfolioGrid from '@/components/portfolio-grid';
import ContactForm from '@/components/contact-form';
import ResumeSection from '@/components/resume-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const socialIcons = [
    {
        name: 'GitHub',
        href: 'https://github.com/ansari313',
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/umair-sarwar/',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
        ),
    },
    {
        name: 'Gmail',
        href: 'mailto:devnerdqa@gmail.com',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M24 4.001C12.954 4.001 4 12.955 4 24.001s8.954 20 20 20 20-8.954 20-20S35.046 4.001 24 4.001z"/>
                <path fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" d="M14 18h20v13H14z"/>
                <path fill="none" stroke="#FFFFFF" strokeWidth="2" strokeMiterlimit="10" d="M14 18l10 8 10-8"/>
            </svg>
        ),
    },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">
        <section id="hero" className="relative flex flex-col items-center justify-center h-screen min-h-[700px] text-center px-4 -mt-20">
          <div className="container">
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
          </div>
        </section>

        <section id="work" className="py-24 bg-secondary/20 animate-slide-in-up">
          <PortfolioGrid />
        </section>

        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight">Catch Me</h2>
            </div>
            <div className="flex justify-center items-center gap-12">
                {socialIcons.map((item, index) => (
                    <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-transform hover:scale-110">
                       {item.icon}
                    </a>
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
