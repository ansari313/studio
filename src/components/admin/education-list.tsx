
'use client';

import type { EducationItem } from '@/lib/types';
import { Card, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface EducationListProps {
  items: EducationItem[];
  onEdit: (item: EducationItem) => void;
  onDelete: (id: string) => void;
}

export default function EducationList({ items, onEdit, onDelete }: EducationListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 border-dashed border-2 rounded-lg">
        <p className="text-muted-foreground">No education entries added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4 flex items-start gap-4">
          <div className="flex-1">
            <h4 className="font-semibold">{item.degree} in {item.fieldOfStudy}</h4>
            <CardDescription>{item.institution}</CardDescription>
            <p className="text-sm text-muted-foreground mt-1">{item.startDate} - {item.endDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this education entry.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(item.id)} className="bg-destructive hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      ))}
    </div>
  );
}
