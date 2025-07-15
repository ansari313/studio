
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { CertificationItem } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  name: z.string().min(1, 'Certification name is required.'),
  issuingOrganization: z.string().min(1, 'Issuing organization is required.'),
  issueDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Date must be in MM/YYYY format.'),
  credentialUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

interface CertificationFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  itemToEdit?: CertificationItem | null;
  onSave: (item: Omit<CertificationItem, 'id'>, id?: string) => void;
}

export default function CertificationForm({ isOpen, setIsOpen, itemToEdit, onSave }: CertificationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      issuingOrganization: '',
      issueDate: '',
      credentialUrl: '',
    },
  });
  
  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        form.reset(itemToEdit);
      } else {
        form.reset({ name: '', issuingOrganization: '', issueDate: '', credentialUrl: '' });
      }
    }
  }, [itemToEdit, form, isOpen]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await onSave(values, itemToEdit?.id);
    setIsSubmitting(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
          <DialogTitle>{itemToEdit ? 'Edit' : 'Add'} Certification</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="px-6 py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Certification Name</FormLabel><FormControl><Input placeholder="Google Certified Professional" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="issuingOrganization" render={({ field }) => (
                        <FormItem><FormLabel>Issuing Organization</FormLabel><FormControl><Input placeholder="Google" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="issueDate" render={({ field }) => (
                        <FormItem><FormLabel>Issue Date</FormLabel><FormControl><Input placeholder="MM/YYYY" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="credentialUrl" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Credential URL (Optional)</FormLabel>
                            <FormControl><Input placeholder="https://example.com/credential" {...field} /></FormControl>
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
