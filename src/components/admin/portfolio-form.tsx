
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { PortfolioItem } from '@/lib/types';
import { suggestPortfolioTags } from '@/ai/flows/suggest-portfolio-tags';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  mediaType: z.enum(['image', 'video']),
  mediaUrl: z.string().min(1, 'Please provide a media URL or upload a file.'),
  projectUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  tags: z.array(z.string()).min(1, 'Please add at least one tag.'),
});

interface PortfolioFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  itemToEdit?: PortfolioItem | null;
  onSave: (item: Omit<PortfolioItem, 'id'>, id?: string) => void;
}

export default function PortfolioForm({ isOpen, setIsOpen, itemToEdit, onSave }: PortfolioFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      mediaType: 'image',
      mediaUrl: '',
      projectUrl: '',
      tags: [],
    },
  });

  const mediaType = form.watch('mediaType');

  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        form.reset({
          title: itemToEdit.title,
          description: itemToEdit.description,
          mediaType: itemToEdit.mediaType,
          mediaUrl: itemToEdit.mediaUrl,
          projectUrl: itemToEdit.projectUrl,
          tags: itemToEdit.tags,
        });
      } else {
        form.reset({ title: '', description: '', mediaType: 'image', mediaUrl: 'https://placehold.co/600x400.png', projectUrl: '', tags: [] });
      }
    }
  }, [itemToEdit, form, isOpen]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const currentTags = form.getValues('tags');
      const newTag = tagInput.trim();
      if (!currentTags.includes(newTag)) {
        form.setValue('tags', [...currentTags, newTag], { shouldValidate: true });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter((tag) => tag !== tagToRemove), { shouldValidate: true });
  };

  const handleSuggestTags = async () => {
    const descriptionValue = form.getValues('description');
    if (descriptionValue.length < 10) {
      toast({
        title: 'Description too short',
        description: 'Please provide a longer description to suggest tags.',
        variant: 'destructive',
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestPortfolioTags({ description: descriptionValue });
      const currentTags = form.getValues('tags');
      const mergedTags = [...new Set([...currentTags, ...result.tags])];
      form.setValue('tags', mergedTags, { shouldValidate: true });
      toast({ title: 'Tags suggested!', description: 'AI-powered suggestions have been added.' });
    } catch (error) {
      console.error('Error suggesting tags:', error);
      toast({
        title: 'Error',
        description: 'Could not suggest tags at this time.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('mediaUrl', reader.result as string, { shouldValidate: true });
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
          <DialogTitle>{itemToEdit ? 'Edit' : 'Add New'} Portfolio Item</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto">
            <ScrollArea className="h-full">
            <div className="px-6 py-4">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl><Input placeholder="Project Title" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="mediaType" render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Media Type</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                            >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="image" /></FormControl>
                                <FormLabel className="font-normal">Image</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="video" /></FormControl>
                                <FormLabel className="font-normal">Video</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField control={form.control} name="mediaUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>{mediaType === 'image' ? 'Image' : 'Video URL'}</FormLabel>
                        <FormControl>
                        {mediaType === 'image' ? (
                            <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            />
                        ) : (
                            <Input 
                            placeholder="https://example.com/media.mp4" 
                            {...field}
                            value={field.value ?? ''}
                            />
                        )}
                        </FormControl>
                         {mediaType === 'image' && form.getValues('mediaUrl') && !form.getValues('mediaUrl').startsWith('data:') && (
                            <FormDescription>Current image URL: {form.getValues('mediaUrl')}</FormDescription>
                        )}
                    </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="projectUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Project Link</FormLabel>
                        <FormControl><Input placeholder="https://your-project-live-url.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />

                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center justify-between">
                                <FormLabel>Description</FormLabel>
                                <Button type="button" size="sm" variant="ghost" onClick={handleSuggestTags} disabled={isSuggesting}>
                                    {isSuggesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                                    <span className="ml-2 hidden sm:inline">Suggest</span>
                                </Button>
                           </div>
                        <FormControl>
                            <Textarea
                                placeholder="Tell us a little bit about your project. You can use HTML tags like <b> for bold."
                                className="resize-y min-h-[150px]"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="tags" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                        <>
                            <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-md min-h-[40px]">
                                {field.value.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="pr-1">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full p-0.5 hover:bg-destructive/20">
                                            <span className="sr-only">Remove {tag}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            <Input
                            placeholder="Type a tag and press Enter"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            />
                        </>
                        </FormControl>
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
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
