
'use client';

import Header from '@/components/header';
import ResumeSection from '@/components/resume-section';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/hero-section';
import WorkSection from '@/components/sections/work-section';
import SocialsSection from '@/components/sections/socials-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WorkSection />
        <SocialsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <footer className="py-6 border-t border-white/10 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
            {currentYear ? `© ${currentYear} FolioFlow. All rights reserved.` : `© ${new Date().getFullYear()} FolioFlow. All rights reserved.`}
        </div>
      </footer>
    </div>
  );
}
