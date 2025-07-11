import Header from '@/components/header';
import PortfolioGrid from '@/components/portfolio-grid';
import ContactForm from '@/components/contact-form';
import ResumeSection from '@/components/resume-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section id="hero" className="py-20 text-center relative overflow-hidden animated-gradient-bg">
            <div className="container relative z-10">
                <h1 className="text-5xl font-extrabold tracking-tighter md:text-6xl lg:text-7xl text-primary-foreground">
                    Crafting Digital Experiences
                </h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-primary-foreground/80">
                    I build beautiful, functional, and user-friendly web applications.
                </p>
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
                    <p className="text-muted-foreground mt-2">Have a project in mind? Let's talk.</p>
                </div>
                <ContactForm />
            </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FolioFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
