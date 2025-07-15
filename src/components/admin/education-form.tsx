
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { EducationItem } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  institution: z.string().min(1, 'Institution name is required.'),
  degree: z.string().min(1, 'Degree is required.'),
  fieldOfStudy: z.string().min(1, 'Field of study is required.'),
  startDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Date must be in MM/YYYY format.'),
  endDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Date must be in MM/YYYY format.'),
  description: z.string().optional(),
  logoUrl: z.string().min(1, 'Logo is required.'),
});

interface EducationFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  itemToEdit?: EducationItem | null;
  onSave: (item: Omit<EducationItem, 'id'>, id?: string) => void;
}

export default function EducationForm({ isOpen, setIsOpen, itemToEdit, onSave }: EducationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      logoUrl: '',
    },
  });
  
  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        form.reset(itemToEdit);
      } else {
        form.reset({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '', logoUrl: 'https://placehold.co/50x50.png' });
      }
    }
  }, [itemToEdit, form, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('logoUrl', reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await onSave(values, itemToEdit?.id);
    setIsSubmitting(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
          <DialogTitle>{itemToEdit ? 'Edit' : 'Add'} Education</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="px-6 py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="institution" render={({ field }) => (
                        <FormItem><FormLabel>Institution</FormLabel><FormControl><Input placeholder="Harvard University" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="degree" render={({ field }) => (
                        <FormItem><FormLabel>Degree</FormLabel><FormControl><Input placeholder="Bachelor of Science" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="fieldOfStudy" render={({ field }) => (
                        <FormItem><FormLabel>Field of Study</FormLabel><FormControl><Input placeholder="Computer Science" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="startDate" render={({ field }) => (
                            <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="MM/YYYY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="endDate" render={({ field }) => (
                            <FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="MM/YYYY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="logoUrl" render={() => (
                        <FormItem>
                            <FormLabel>Institution Logo</FormLabel>
                            <FormControl><Input type="file" accept="image/*" onChange={handleFileChange} /></FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl><Textarea placeholder="Describe your activities and societies." className="resize-y min-h-[100px]" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
              </Form>
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="p-6 pt-4 border-t flex-shrink-0">
            <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
            <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90" onClick={form.handleSubmit(onSubmit)}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
