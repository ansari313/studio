// @/components/admin/resume-manager.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ResumeData } from '@/lib/types';
import { mockResumeData } from '@/lib/data';
import { Badge } from '../ui/badge';

const STORAGE_KEY = 'folioflow_resume_data';

const formSchema = z.object({
  sectionTitle: z.string().min(1, 'Section title is required.'),
  sectionDescription: z.string().min(1, 'Section description is required.'),
  cardTitle: z.string().min(1, 'Card title is required.'),
  cardSubtitle: z.string().min(1, 'Card subtitle is required.'),
  summary: z.string().min(10, 'Summary must be at least 10 characters.'),
  skills: z.array(z.string()).min(1, 'Please add at least one skill.'),
  experience: z.string().min(10, 'Experience section must be at least 10 characters.'),
  cvUrl: z.string().url('Please enter a valid URL for the CV.'),
  imageUrl: z.string().min(1, 'Please upload an image.'),
});

export default function ResumeManager() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mockResumeData,
  });

  useEffect(() => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            form.reset(parsedData);
        }
    } catch (e) {
        console.error("Failed to load resume data from localStorage", e);
    }
  }, [form]);

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      const currentSkills = form.getValues('skills');
      const newSkill = skillInput.trim();
      if (!currentSkills.includes(newSkill)) {
        form.setValue('skills', [...currentSkills, newSkill], { shouldValidate: true });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues('skills');
    form.setValue('skills', currentSkills.filter((skill) => skill !== skillToRemove), { shouldValidate: true });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('imageUrl', reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
        toast({ title: 'Resume updated successfully!' });
    } catch (e) {
        toast({ title: 'Failed to save data', description: 'Your browser storage might be full or disabled.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Resume</CardTitle>
        <CardDescription>Update the content of your resume section here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="sectionTitle" render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl><Input placeholder="My Resume" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="sectionDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Description</FormLabel>
                  <FormControl><Input placeholder="A brief overview..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="cardTitle" render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Title</FormLabel>
                  <FormControl><Input placeholder="Curriculum Vitae" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="cardSubtitle" render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Subtitle</FormLabel>
                  <FormControl><Input placeholder="Software Engineer" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="summary" render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl><Textarea placeholder="A brief summary about you..." {...field} rows={4} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

             <FormField control={form.control} name="imageUrl" render={({ field }) => (
              <FormItem>
                <FormLabel>Your Image</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="skills" render={({ field }) => (
              <FormItem>
                <FormLabel>Key Skills</FormLabel>
                <FormControl>
                  <>
                    <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-md min-h-[40px]">
                        {form.watch('skills').map((skill) => (
                            <Badge key={skill} variant="secondary" className="pr-1">
                                {skill}
                                <button type="button" onClick={() => removeSkill(skill)} className="ml-1 rounded-full p-0.5 hover:bg-destructive/20">
                                    <span className="sr-only">Remove {skill}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <Input
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="experience" render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl><Textarea placeholder="Describe your experience..." {...field} rows={6} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="cvUrl" render={({ field }) => (
              <FormItem>
                <FormLabel>CV Download URL</FormLabel>
                <FormControl><Input placeholder="/cv.pdf or https://example.com/cv.pdf" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
