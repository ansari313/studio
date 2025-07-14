
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ResumeData } from '@/lib/types';
import { getResumeData } from '@/actions/resume-actions';

export default function ResumeSection() {
    const [resume, setResume] = useState<ResumeData | null>(null);

    useEffect(() => {
        getResumeData()
            .then(setResume)
            .catch(e => {
                console.error("Failed to load resume data", e);
            });
    }, []);

    if (!resume) {
        return (
            <section id="resume" className="py-24">
                <div className="container text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto" />
                    <p className="text-muted-foreground mt-2">Loading Resume...</p>
                </div>
            </section>
        );
    }

    return (
        <section id="resume" className="py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">{resume.sectionTitle}</h2>
                    <p className="text-muted-foreground mt-2">{resume.sectionDescription}</p>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1 flex justify-center">
                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                           <Image
                                src={resume.imageUrl}
                                alt="User image"
                                fill
                                className="object-cover"
                                data-ai-hint="portrait person"
                           />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardContent className="p-8">
                                <ScrollArea className="h-[400px] pr-6">
                                  <div className="space-y-6">
                                      <div>
                                          <h4 className="font-semibold text-lg mb-2">Summary</h4>
                                          <p className="text-muted-foreground">{resume.summary}</p>
                                      </div>
                                      <div>
                                          <h4 className="font-semibold text-lg mb-2">Key Skills</h4>
                                          <ul className="list-disc list-inside text-muted-foreground grid grid-cols-2 md:grid-cols-3 gap-2">
                                              {resume.skills.map(skill => <li key={skill}>{skill}</li>)}
                                          </ul>
                                      </div>
                                      <div>
                                          <h4 className="font-semibold text-lg mb-2">Experience</h4>
                                          <p className="text-muted-foreground whitespace-pre-wrap">{resume.experience}</p>
                                      </div>
                                  </div>
                                </ScrollArea>
                                <div className="mt-10 text-center">
                                    <Button asChild className="bg-accent hover:bg-accent/90">
                                        <a href={resume.cvUrl} download>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download CV
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
