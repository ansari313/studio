
'use client';

import ContactForm from '@/components/contact-form';

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 md:py-24 bg-secondary/20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Get In Touch</h2>
                    <p className="text-muted-foreground mt-2">Have a project in mind? Let&apos;s talk.</p>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}
