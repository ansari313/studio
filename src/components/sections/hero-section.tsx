
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section id="hero" className="relative flex flex-col items-center justify-center text-center px-4 py-32 md:py-48">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif leading-tight animate-pop-in">
                        Trust nothing, test everything.
                    </h1>
                    <p className="mt-6 text-md sm:text-lg text-foreground/80 max-w-2xl mx-auto animate-pop-in [animation-delay:200ms]">
                        A true QA doesn&apos;t fear AI — we test it, break it, and make it better. If it can’t handle scrutiny, it’s not ready for release.
                    </p>
                    <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base animate-pop-in [animation-delay:400ms]">
                        <Link href="#contact">Let&apos;s Capture Together</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
