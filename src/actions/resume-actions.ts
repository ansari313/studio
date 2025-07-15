
'use server';

import db from '@/lib/db';
import type { ResumeData, ExperienceItem } from '@/lib/types';
import { revalidatePath } from 'next/cache';

// Helper to deserialize skills and experience
const deserializeData = (data: any, experience: ExperienceItem[]): ResumeData => ({
    ...data,
    skills: JSON.parse(data.skills || '[]'),
    experience: experience,
});

export async function getResumeData(): Promise<ResumeData | null> {
    const resumePromise = db.prepare('SELECT cardTitle, cardSubtitle, summary, skills, cvUrl, imageUrl FROM resume WHERE id = 1').get();
    // Sort by year then month descending to get latest first.
    const experiencePromise = db.prepare('SELECT * FROM resume_experience ORDER BY SUBSTR(startDate, 4, 4) DESC, SUBSTR(startDate, 1, 2) DESC').all();
    
    const [data, experience] = await Promise.all([resumePromise, experiencePromise]) as [any, ExperienceItem[]];

    if (!data) return null;
    return deserializeData(data, experience);
}

export async function saveResumeData(data: Omit<ResumeData, 'experience'>) {
    const { cardTitle, cardSubtitle, summary, skills, cvUrl, imageUrl } = data;
    const serializedSkills = JSON.stringify(skills);

    const stmt = db.prepare(`
        UPDATE resume SET cardTitle = ?, cardSubtitle = ?, summary = ?, skills = ?, cvUrl = ?, imageUrl = ? WHERE id = 1;
    `);

    stmt.run(cardTitle, cardSubtitle, summary, serializedSkills, cvUrl, imageUrl);

    revalidatePath('/');
    revalidatePath('/admin');
}

export async function saveExperienceItem(item: Omit<ExperienceItem, 'id' | 'sortOrder'>, id?: string) {
    const { logoUrl, companyName, position, startDate, endDate, description } = item;
    
    if (id) {
        const stmt = db.prepare('UPDATE resume_experience SET logoUrl = ?, companyName = ?, position = ?, startDate = ?, endDate = ?, description = ? WHERE id = ?');
        stmt.run(logoUrl, companyName, position, startDate, endDate, description, id);
    } else {
        const newId = Date.now().toString();
        // get max sortOrder and add 1
        const maxSortOrder = db.prepare('SELECT MAX(sortOrder) as max FROM resume_experience').get() as { max: number | null };
        const sortOrder = (maxSortOrder.max ?? -1) + 1;
        const stmt = db.prepare('INSERT INTO resume_experience (id, logoUrl, companyName, position, startDate, endDate, description, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(newId, logoUrl, companyName, position, startDate, endDate, description, sortOrder);
    }

    revalidatePath('/');
    revalidatePath('/admin');
}

export async function deleteExperienceItem(id: string) {
    const stmt = db.prepare('DELETE FROM resume_experience WHERE id = ?');
    stmt.run(id);
    revalidatePath('/');
    revalidatePath('/admin');
}

export async function updateExperienceOrder(experience: Pick<ExperienceItem, 'id'>[]) {
    const stmt = db.prepare('UPDATE resume_experience SET sortOrder = ? WHERE id = ?');
    const transaction = db.transaction((items) => {
        for (const [index, item] of items.entries()) {
            stmt.run(index, item.id);
        }
    });
    transaction(experience);
    revalidatePath('/');
    revalidatePath('/admin');
}
