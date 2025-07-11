
import Header from '@/components/header';
import PortfolioGrid from '@/components/portfolio-grid';
import ContactForm from '@/components/contact-form';
import ResumeSection from '@/components/resume-section';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F5F8]">
      <Header />
      <main className="flex-1">
        <section id="hero" className="relative h-[90vh] min-h-[700px] text-zinc-900 overflow-hidden">
          <div className="container h-full relative z-10">
            <div className="relative grid grid-cols-12 grid-rows-6 h-full">
              <div className="col-span-5 row-span-2 flex flex-col justify-center">
                <p className="text-lg">
                  Hello, I&apos;m David Petrix, UX/UI Designer
                  <br />
                  and Front-end Developer Based in San Francisco.
                </p>
              </div>

              <div className="col-span-12 row-start-3 flex items-center justify-center">
                 <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter text-center leading-none -mt-16">
                    I LOVE <span className="text-stroke">WEB APPS</span>
                 </h1>
              </div>

              <div className="col-span-2 row-start-6 flex items-center gap-2">
                 <ArrowDown className="h-6 w-6" />
                 <span>Scroll Down</span>
              </div>
              
              <div className="col-span-5 col-start-8 row-start-6 flex items-center justify-end">
                <p className="text-right text-sm">
                  Feel Free to send me a message if
                  <br />
                  you want to enhance your recruitment.
                  <br />
                  <span className="font-semibold">Facebook . Twitter . Linkedin . Dribbble</span>
                </p>
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-full pointer-events-none">
                 <Image
                    src="https://placehold.co/800x900.png"
                    alt="Hero image of a person"
                    fill
                    className="object-contain object-bottom"
                    data-ai-hint="man portrait"
                    priority
                  />
              </div>

            </div>
          </div>
        </section>

        <section className="bg-black text-white py-4 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex">
                <span className="text-2xl mx-4 font-bold">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold text-stroke-white">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold text-stroke-white">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold text-stroke-white">ABOUT ME</span>
                 <span className="text-2xl mx-4 font-bold">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold text-stroke-white">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold">ABOUT ME</span>
                <span className="text-2xl mx-4 font-bold text-stroke-white">ABOUT ME</span>
            </div>
        </section>

        <section id="work" className="bg-secondary/50">
          <PortfolioGrid />
        </section>

        <ResumeSection />

        <section id="contact" className="py-24 bg-secondary/50">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">Get In Touch</h2>
                    <p className="text-muted-foreground mt-2">Have a project in mind? Let&apos;s talk.</p>
                </div>
                <ContactForm />
            </div>
        </section>
      </main>
      <footer className="py-6 border-t bg-background">
        <div className="container text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FolioFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
