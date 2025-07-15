
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Award, BookOpen } from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import { getResumeData } from '@/actions/resume-actions';
import { Separator } from './ui/separator';

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
                    <h2 className="text-4xl font-bold tracking-tight">My Resume</h2>
                    <p className="text-muted-foreground mt-2">A brief overview of my skills and experience.</p>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1 flex flex-col items-center gap-8">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg bg-secondary">
                           <Image
                                src={resume.imageUrl}
                                alt="User image"
                                fill
                                className="object-cover"
                                data-ai-hint="portrait person"
                           />
                        </div>
                        <div>
                            <h4 className="font-semibold text-xl mb-4 text-center">Key Skills</h4>
                            <ul className="list-disc list-inside text-muted-foreground grid grid-cols-2 gap-x-6 gap-y-2">
                                {resume.skills.map(skill => <li key={skill}>{skill}</li>)}
                            </ul>
                        </div>
                         <Button asChild className="bg-accent hover:bg-accent/90 w-full max-w-xs">
                            <a href={resume.cvUrl} download>
                                <Download className="mr-2 h-4 w-4" />
                                Download CV
                            </a>
                        </Button>
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardContent className="p-8">
                              <div className="space-y-8">
                                  <div>
                                      <h3 className="font-bold text-2xl mb-4">Summary</h3>
                                      <p className="text-muted-foreground">{resume.summary}</p>
                                  </div>
                                  
                                  {resume.experience.length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-2xl mb-6">Work Experience</h3>
                                        <div className="relative pl-6 space-y-10 border-l-2 border-border/50">
                                            {resume.experience.map((item, index) => (
                                                <div key={item.id} className="relative">
                                                    <div className={`absolute w-3 h-3 bg-primary rounded-full -left-[31px] top-1.5 ${index !== 0 ? 'ring-4 ring-background' : ''}`}></div>
                                                    {index === 0 && <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-background"></div>}
                                                    <div className="flex items-start gap-4">
                                                        <Image src={item.logoUrl} alt={`${item.companyName} logo`} width={50} height={50} className="rounded-md border bg-secondary object-contain" data-ai-hint="logo company" />
                                                        <div className='flex-1'>
                                                            <p className="text-sm text-muted-foreground">{item.startDate} - {item.endDate}</p>
                                                            <h4 className="font-semibold text-lg">{item.position}</h4>
                                                            <p className="font-medium text-primary">{item.companyName}</p>
                                                            <p className="mt-2 text-muted-foreground text-sm whitespace-pre-wrap">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                  )}

                                  {resume.education.length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-2xl mb-6 flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" />Education</h3>
                                        <div className="space-y-6">
                                            {resume.education.map((item) => (
                                                <div key={item.id}>
                                                    <p className="text-sm text-muted-foreground">{item.startDate} - {item.endDate}</p>
                                                    <h4 className="font-semibold text-lg">{item.degree} in {item.fieldOfStudy}</h4>
                                                    <p className="font-medium text-primary">{item.institution}</p>
                                                    {item.description && <p className="mt-2 text-muted-foreground text-sm whitespace-pre-wrap">{item.description}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                  )}

                                  {resume.certifications.length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-2xl mb-6 flex items-center gap-2"><Award className="h-6 w-6 text-primary" />Certifications</h3>
                                        <div className="space-y-4">
                                            {resume.certifications.map((item, index) => (
                                                <div key={item.id}>
                                                    <h4 className="font-semibold text-lg">{item.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{item.issuingOrganization} &middot; Issued {item.issueDate}</p>
                                                    {item.credentialUrl && (
                                                        <Button asChild variant="link" className="p-0 h-auto text-sm">
                                                            <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer">Show Credential</a>
                                                        </Button>
                                                    )}
                                                     {index < resume.certifications.length - 1 && <Separator className="my-4" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                  )}

                              </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
