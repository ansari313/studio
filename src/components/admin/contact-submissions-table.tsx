
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MoreHorizontal, Eye, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ContactSubmission } from '@/lib/types';
import { format } from 'date-fns';
import { getContactSubmissions, deleteContactSubmission } from '@/actions/contact-actions';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ContactSubmissionsTable() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const subs = await getContactSubmissions();
      setSubmissions(subs);
    } catch (e) {
      console.error("Failed to load contact submissions.", e);
      toast({
        title: 'Error loading messages',
        description: 'Could not retrieve messages from the database.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteContactSubmission(id);
      toast({ title: 'Message deleted successfully.' });
      fetchSubmissions(); // Refresh the list
    } catch(e) {
      toast({ title: 'Error', description: 'Failed to delete message.', variant: 'destructive'});
    }
  };

  const handleView = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsViewOpen(true);
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                </TableCell>
              </TableRow>
            ) : submissions.length > 0 ? (
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
                        <DropdownMenuItem onClick={() => handleView(submission)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                           <DropdownMenuItem className="text-destructive hover:bg-destructive/10 hover:text-destructive focus:text-destructive focus:bg-destructive/10">
                             <Trash2 className="mr-2 h-4 w-4" />
                             Delete
                           </DropdownMenuItem>
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
                            <AlertDialogAction onClick={() => handleDelete(submission.id as string)} className="bg-destructive hover:bg-destructive/90">
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

       <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Message from {selectedSubmission?.name}</DialogTitle>
            <DialogDescription>
              {selectedSubmission && format(new Date(selectedSubmission.submittedAt), 'PPP p')}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 -mx-6">
            {selectedSubmission && (
              <div className="space-y-4 px-6 pb-6">
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">{selectedSubmission.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Message</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
