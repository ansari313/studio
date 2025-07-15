
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
import type { ExperienceItem } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  companyName: z.string().min(1, 'Company name is required.'),
  position: z.string().min(1, 'Position is required.'),
  startDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Date must be in MM/YYYY format.'),
  endDate: z.string().min(1, 'End date is required.'),
  description: z.string().min(10, 'Description is required.'),
  logoUrl: z.string().min(1, 'Logo is required.'),
});

interface ExperienceFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  itemToEdit?: ExperienceItem | null;
  onSave: (item: Omit<ExperienceItem, 'id'>, id?: string) => void;
}

export default function ExperienceForm({ isOpen, setIsOpen, itemToEdit, onSave }: ExperienceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      position: '',
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
        form.reset({ companyName: '', position: '', startDate: '', endDate: '', description: '', logoUrl: 'https://placehold.co/50x50.png' });
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
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle>{itemToEdit ? 'Edit' : 'Add'} Experience</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
            <div className="px-6 py-4">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                        <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Acme Inc." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="position" render={({ field }) => (
                        <FormItem><FormLabel>Position</FormLabel><FormControl><Input placeholder="Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="startDate" render={({ field }) => (
                            <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="MM/YYYY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="endDate" render={({ field }) => (
                            <FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="MM/YYYY or Present" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="logoUrl" render={() => (
                        <FormItem>
                            <FormLabel>Company Logo</FormLabel>
                            <FormControl><Input type="file" accept="image/*" onChange={handleFileChange} /></FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl><Textarea placeholder="Describe your role and responsibilities." className="resize-y min-h-[150px]" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
                </Form>
            </div>
            </ScrollArea>
        </div>
        <DialogFooter className="p-6 pt-4 border-t">
            <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
            <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90" onClick={form.handleSubmit(onSubmit)}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
