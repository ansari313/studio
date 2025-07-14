'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MoreHorizontal, PlusCircle, Video, Image as ImageIcon, Loader2, Trash2, Pencil } from 'lucide-react';
import Image from 'next/image';
import type { PortfolioItem } from '@/lib/types';
import PortfolioForm from './portfolio-form';
import { useToast } from '@/hooks/use-toast';
import { getPortfolioItems, deletePortfolioItem, savePortfolioItem } from '@/actions/portfolio-actions';

export default function PortfolioDataTable() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<PortfolioItem | null>(null);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const portfolioItems = await getPortfolioItems();
      setItems(portfolioItems);
    } catch (e) {
      console.error("Failed to load portfolio data", e);
      toast({ title: 'Error', description: 'Failed to load portfolio items.', variant: 'destructive'});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddNew = () => {
    setItemToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setItemToEdit(item);
    setIsFormOpen(true);
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deletePortfolioItem(id);
      toast({ title: 'Item deleted successfully.' });
      fetchItems(); // Refresh list
    } catch(e) {
      toast({ title: 'Error', description: 'Failed to delete portfolio item.', variant: 'destructive'});
    }
  };

  const handleSave = async (item: Omit<PortfolioItem, 'id'>, id?: string) => {
    try {
      await savePortfolioItem(item, id);
      toast({ title: `Portfolio item ${id ? 'updated' : 'created'}!` });
      setIsFormOpen(false);
      fetchItems(); // Refresh list
    } catch(e) {
      toast({ title: 'Error', description: 'Failed to save portfolio item.', variant: 'destructive'});
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-semibold">Portfolio Items</h2>
        <Button onClick={handleAddNew} className="bg-accent hover:bg-accent/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Media</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden lg:table-cell">Tags</TableHead>
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
            ) : items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                    {item.mediaType === 'image' ? (
                        <Image src={item.mediaUrl} alt={item.title} width={60} height={40} className="rounded object-cover" />
                    ) : (
                        <div className="w-[60px] h-[40px] bg-secondary rounded flex items-center justify-center">
                            <Video className="h-6 w-6 text-muted-foreground" />
                        </div>
                    )}
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-sm truncate">{item.description}</TableCell>
                <TableCell className="hidden lg:table-cell">{item.tags.join(', ')}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
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
                                This action cannot be undone. This will permanently delete the portfolio item.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id as string)} className="bg-destructive hover:bg-destructive/90">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                   </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PortfolioForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        itemToEdit={itemToEdit}
        onSave={handleSave}
      />
    </div>
  );
}
