'use server';

import db from '@/lib/db';
import type { ContactSubmission } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.prepare('SELECT * FROM contact_submissions ORDER BY submittedAt DESC').all() as ContactSubmission[];
}

export async function saveContactSubmission(data: Omit<ContactSubmission, 'id' | 'submittedAt'>) {
    const { name, email, message } = data;
    const newSubmission = {
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        name,
        email,
        message,
    };
    
    const stmt = db.prepare('INSERT INTO contact_submissions (id, name, email, message, submittedAt) VALUES (?, ?, ?, ?, ?)');
    stmt.run(newSubmission.id, newSubmission.name, newSubmission.email, newSubmission.message, newSubmission.submittedAt);

    revalidatePath('/admin');
}

export async function deleteContactSubmission(id: string) {
    const stmt = db.prepare('DELETE FROM contact_submissions WHERE id = ?');
    stmt.run(id);
    revalidatePath('/admin');
}
