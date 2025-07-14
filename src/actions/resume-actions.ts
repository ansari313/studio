'use server';

import db from '@/lib/db';
import type { ResumeData } from '@/lib/types';
import { revalidatePath } from 'next/cache';

// Helper to deserialize skills
const deserializeData = (data: any): ResumeData => ({
    ...data,
    skills: JSON.parse(data.skills || '[]'),
});

export async function getResumeData(): Promise<ResumeData | null> {
    // Select all fields except the old static ones.
    const data = db.prepare('SELECT cardTitle, cardSubtitle, summary, skills, experience, cvUrl, imageUrl FROM resume WHERE id = 1').get();
    if (!data) return null;
    return deserializeData(data);
}

export async function saveResumeData(data: ResumeData) {
    const { cardTitle, cardSubtitle, summary, skills, experience, cvUrl, imageUrl } = data;
    const serializedSkills = JSON.stringify(skills);

    const stmt = db.prepare(`
        INSERT INTO resume (id, sectionTitle, sectionDescription, cardTitle, cardSubtitle, summary, skills, experience, cvUrl, imageUrl) 
        VALUES (1, 'My Resume', 'A brief overview of my skills and experience.', ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) 
        DO UPDATE SET
            cardTitle = excluded.cardTitle,
            cardSubtitle = excluded.cardSubtitle,
            summary = excluded.summary,
            skills = excluded.skills,
            experience = excluded.experience,
            cvUrl = excluded.cvUrl,
            imageUrl = excluded.imageUrl;
    `);

    stmt.run(cardTitle, cardSubtitle, summary, serializedSkills, experience, cvUrl, imageUrl);

    revalidatePath('/');
    revalidatePath('/admin');
}
