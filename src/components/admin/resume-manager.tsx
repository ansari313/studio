
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
import { Loader2, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ResumeData, ExperienceItem, EducationItem, CertificationItem } from '@/lib/types';
import { Badge } from '../ui/badge';
import { getResumeData, saveResumeData, deleteExperienceItem, saveExperienceItem, saveEducationItem, deleteEducationItem, saveCertificationItem, deleteCertificationItem } from '@/actions/resume-actions';
import ExperienceList from './experience-list';
import ExperienceForm from './experience-form';
import EducationList from './education-list';
import EducationForm from './education-form';
import CertificationList from './certification-list';
import CertificationForm from './certification-form';

const formSchema = z.object({
  cardTitle: z.string().min(1, 'Card title is required.'),
  cardSubtitle: z.string().min(1, 'Card subtitle is required.'),
  summary: z.string().min(10, 'Summary must be at least 10 characters.'),
  skills: z.array(z.string()).min(1, 'Please add at least one skill.'),
  cvUrl: z.string().url('Please enter a valid URL for the CV.'),
  imageUrl: z.string().min(1, 'Please upload an image.'),
});

export default function ResumeManager() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skillInput, setSkillInput] = useState('');
  
  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>([]);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<ExperienceItem | null>(null);

  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState<EducationItem | null>(null);

  const [certificationItems, setCertificationItems] = useState<CertificationItem[]>([]);
  const [isCertificationFormOpen, setIsCertificationFormOpen] = useState(false);
  const [certificationToEdit, setCertificationToEdit] = useState<CertificationItem | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardTitle: '',
      cardSubtitle: '',
      summary: '',
      skills: [],
      cvUrl: '',
      imageUrl: '',
    },
  });

  const fetchResumeData = async () => {
    setLoading(true);
    try {
      const data = await getResumeData();
      if (data) {
        form.reset({
          cardTitle: data.cardTitle,
          cardSubtitle: data.cardSubtitle,
          summary: data.summary,
          skills: data.skills,
          cvUrl: data.cvUrl,
          imageUrl: data.imageUrl,
        });
        setExperienceItems(data.experience);
        setEducationItems(data.education);
        setCertificationItems(data.certifications);
      }
    } catch (e) {
      console.error("Failed to load resume data from database", e);
      toast({ title: 'Error', description: 'Failed to load resume data.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

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
    try {
        await saveResumeData(values);
        toast({ title: 'Resume details updated successfully!' });
    } catch (e) {
        toast({ title: 'Failed to save data', description: 'Could not save resume details.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  }

  // Experience handlers
  const handleAddNewExperience = () => { setExperienceToEdit(null); setIsExperienceFormOpen(true); };
  const handleEditExperience = (item: ExperienceItem) => { setExperienceToEdit(item); setIsExperienceFormOpen(true); };
  const handleDeleteExperience = async (id: string) => {
    try { await deleteExperienceItem(id); toast({ title: 'Experience item deleted.' }); fetchResumeData(); } 
    catch (e) { toast({ title: 'Error', description: 'Could not delete experience item.', variant: 'destructive' });}
  };
  const handleSaveExperience = async (item: Omit<ExperienceItem, 'id' | 'sortOrder'>, id?: string) => {
    try { await saveExperienceItem(item, id); toast({ title: `Experience ${id ? 'updated' : 'added'} successfully.` }); setIsExperienceFormOpen(false); fetchResumeData(); } 
    catch (e) { toast({ title: 'Error', description: 'Could not save experience item.', variant: 'destructive' }); }
  };

  // Education handlers
  const handleAddNewEducation = () => { setEducationToEdit(null); setIsEducationFormOpen(true); };
  const handleEditEducation = (item: EducationItem) => { setEducationToEdit(item); setIsEducationFormOpen(true); };
  const handleDeleteEducation = async (id: string) => {
    try { await deleteEducationItem(id); toast({ title: 'Education entry deleted.' }); fetchResumeData(); }
    catch (e) { toast({ title: 'Error', description: 'Could not delete education entry.', variant: 'destructive' }); }
  };
  const handleSaveEducation = async (item: Omit<EducationItem, 'id'>, id?: string) => {
    try { await saveEducationItem(item, id); toast({ title: `Education ${id ? 'updated' : 'added'} successfully.` }); setIsEducationFormOpen(false); fetchResumeData(); }
    catch (e) { toast({ title: 'Error', description: 'Could not save education entry.', variant: 'destructive' });}
  };

  // Certification handlers
  const handleAddNewCertification = () => { setCertificationToEdit(null); setIsCertificationFormOpen(true); };
  const handleEditCertification = (item: CertificationItem) => { setCertificationToEdit(item); setIsCertificationFormOpen(true); };
  const handleDeleteCertification = async (id: string) => {
    try { await deleteCertificationItem(id); toast({ title: 'Certification deleted.' }); fetchResumeData(); }
    catch (e) { toast({ title: 'Error', description: 'Could not delete certification.', variant: 'destructive' }); }
  };
  const handleSaveCertification = async (item: Omit<CertificationItem, 'id'>, id?: string) => {
    try { await saveCertificationItem(item, id); toast({ title: `Certification ${id ? 'updated' : 'added'} successfully.` }); setIsCertificationFormOpen(false); fetchResumeData(); }
    catch (e) { toast({ title: 'Error', description: 'Could not save certification.', variant: 'destructive' }); }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(4)].map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <CardTitle><div className="h-6 w-48 bg-muted rounded animate-pulse" /></CardTitle>
                    <CardDescription><div className="h-4 w-64 bg-muted rounded animate-pulse" /></CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </CardContent>
            </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Resume Details</CardTitle>
          <CardDescription>Update your personal details, skills, and CV link.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="cardTitle" render={({ field }) => (
                  <FormItem><FormLabel>Card Title</FormLabel><FormControl><Input placeholder="Curriculum Vitae" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="cardSubtitle" render={({ field }) => (
                  <FormItem><FormLabel>Card Subtitle</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <FormField control={form.control} name="summary" render={({ field }) => (
                <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="A brief summary about you..." {...field} rows={4} /></FormControl><FormMessage /></FormItem>
              )} />

              <FormField control={form.control} name="imageUrl" render={() => (
                <FormItem><FormLabel>Your Image</FormLabel><FormControl><Input type="file" accept="image/*" onChange={handleFileChange} /></FormControl><FormMessage /></FormItem>
              )} />

              <FormField control={form.control} name="skills" render={() => (
                <FormItem>
                  <FormLabel>Key Skills</FormLabel>
                  <FormControl>
                    <div>
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
                      <Input placeholder="Type a skill and press Enter" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} />
                    </div>
                  </FormControl><FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="cvUrl" render={({ field }) => (
                <FormItem><FormLabel>CV Download URL</FormLabel><FormControl><Input placeholder="/cv.pdf or https://example.com/cv.pdf" {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Details
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
              <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Manage your professional experience entries.</CardDescription>
              </div>
              <Button onClick={handleAddNewExperience} className="bg-accent hover:bg-accent/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
              </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ExperienceList items={experienceItems} setItems={setExperienceItems} onEdit={handleEditExperience} onDelete={handleDeleteExperience} />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
              <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Manage your educational background.</CardDescription>
              </div>
              <Button onClick={handleAddNewEducation} className="bg-accent hover:bg-accent/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Education
              </Button>
          </div>
        </CardHeader>
        <CardContent>
          <EducationList items={educationItems} onEdit={handleEditEducation} onDelete={handleDeleteEducation} />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
              <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Manage your professional certifications.</CardDescription>
              </div>
              <Button onClick={handleAddNewCertification} className="bg-accent hover:bg-accent/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
              </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CertificationList items={certificationItems} onEdit={handleEditCertification} onDelete={handleDeleteCertification} />
        </CardContent>
      </Card>

      <ExperienceForm isOpen={isExperienceFormOpen} setIsOpen={setIsExperienceFormOpen} itemToEdit={experienceToEdit} onSave={handleSaveExperience} />
      <EducationForm isOpen={isEducationFormOpen} setIsOpen={setIsEducationFormOpen} itemToEdit={educationToEdit} onSave={handleSaveEducation} />
      <CertificationForm isOpen={isCertificationFormOpen} setIsOpen={setIsCertificationFormOpen} itemToEdit={certificationToEdit} onSave={handleSaveCertification} />
    </>
  );
}
