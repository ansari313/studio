import Header from '@/components/header';
import PortfolioGrid from '@/components/portfolio-grid';
import ContactForm from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import Link from 'next/link';

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

        <section id="resume" className="py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">My Resume</h2>
                    <p className="text-muted-foreground mt-2">A brief overview of my skills and experience.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardContent className="p-8">
                            <div className="flex items-center gap-6 mb-8">
                                <FileText className="w-12 h-12 text-accent" />
                                <div>
                                    <h3 className="text-2xl font-semibold">Curriculum Vitae</h3>
                                    <p className="text-muted-foreground">Software Engineer & Web Developer</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Summary</h4>
                                    <p className="text-muted-foreground">Dynamic and innovative software engineer with a knack for creating robust web applications from the ground up. Proficient in modern frameworks and passionate about clean code and user-centric design.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Key Skills</h4>
                                    <ul className="list-disc list-inside text-muted-foreground grid grid-cols-2 md:grid-cols-3 gap-2">
                                        <li>Next.js & React</li>
                                        <li>TypeScript</li>
                                        <li>Node.js</li>
                                        <li>Tailwind CSS</li>
                                        <li>GenAI Integration</li>
                                        <li>Cloud Deployment</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Experience</h4>
                                    <p className="text-muted-foreground">Detailed work history available in the full downloadable resume.</p>
                                </div>
                            </div>
                            <div className="mt-10 text-center">
                                <Button asChild className="bg-accent hover:bg-accent/90">
                                    <a href="/cv.pdf" download>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download CV
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

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
