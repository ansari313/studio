// @/components/admin/contact-submissions-table.tsx
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MoreHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ContactSubmission } from '@/lib/types';
import { CONTACT_SUBMISSIONS_STORAGE_KEY } from '@/lib/types';
import { format } from 'date-fns';

export default function ContactSubmissionsTable() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(CONTACT_SUBMISSIONS_STORAGE_KEY);
      if (storedData) {
        setSubmissions(JSON.parse(storedData));
      }
    } catch (e) {
      console.error("Failed to load contact submissions.", e);
      toast({
        title: 'Error loading messages',
        description: 'Could not retrieve messages from local storage.',
        variant: 'destructive'
      });
    }
  }, [toast]);

  const persistSubmissions = (newSubmissions: ContactSubmission[]) => {
    localStorage.setItem(CONTACT_SUBMISSIONS_STORAGE_KEY, JSON.stringify(newSubmissions));
    setSubmissions(newSubmissions);
  };
  
  const handleDelete = (id: string) => {
    const newSubmissions = submissions.filter(item => item.id !== id);
    persistSubmissions(newSubmissions);
    toast({ title: 'Message deleted successfully.' });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-semibold">Contact Messages</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Message</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length > 0 ? (
              submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell className="hidden md:table-cell max-w-sm truncate">{submission.message}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {format(new Date(submission.submittedAt), 'PPp')}
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <AlertDialogTrigger asChild>
                           <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this message.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(submission.id)} className="bg-destructive hover:bg-destructive/90">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                   </AlertDialog>
                </TableCell>
              </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No messages yet.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
