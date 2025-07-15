
'use server';

import db from '@/lib/db';
import type { ResumeData, ExperienceItem, EducationItem, CertificationItem } from '@/lib/types';
import { revalidatePath } from 'next/cache';

// Helper to deserialize skills and experience
const deserializeData = (data: any, experience: ExperienceItem[], education: EducationItem[], certifications: CertificationItem[]): ResumeData => ({
    ...data,
    skills: JSON.parse(data.skills || '[]'),
    experience: experience,
    education: education,
    certifications: certifications,
});

export async function getResumeData(): Promise<ResumeData | null> {
    const resumePromise = db.prepare('SELECT cardTitle, cardSubtitle, summary, skills, cvUrl, imageUrl FROM resume WHERE id = 1').get();
    // Sort by year then month descending to get latest first.
    const experiencePromise = db.prepare("SELECT * FROM resume_experience ORDER BY CASE WHEN endDate = 'Present' THEN 1 ELSE 0 END DESC, SUBSTR(endDate, 4, 4) DESC, SUBSTR(endDate, 1, 2) DESC, SUBSTR(startDate, 4, 4) DESC, SUBSTR(startDate, 1, 2) DESC").all();
    const educationPromise = db.prepare('SELECT * FROM resume_education ORDER BY SUBSTR(endDate, 4, 4) DESC, SUBSTR(endDate, 1, 2) DESC').all();
    const certificationsPromise = db.prepare('SELECT * FROM resume_certifications ORDER BY SUBSTR(issueDate, 4, 4) DESC, SUBSTR(issueDate, 1, 2) DESC').all();
    
    const [data, experience, education, certifications] = await Promise.all([resumePromise, experiencePromise, educationPromise, certificationsPromise]) as [any, ExperienceItem[], EducationItem[], CertificationItem[]];

    if (!data) return null;
    return deserializeData(data, experience, education, certifications);
}

export async function saveResumeData(data: Omit<ResumeData, 'experience' | 'education' | 'certifications'>) {
    const { cardTitle, cardSubtitle, summary, skills, cvUrl, imageUrl } = data;
    const serializedSkills = JSON.stringify(skills);

    const stmt = db.prepare(`
        UPDATE resume SET cardTitle = ?, cardSubtitle = ?, summary = ?, skills = ?, cvUrl = ?, imageUrl = ? WHERE id = 1;
    `);

    stmt.run(cardTitle, cardSubtitle, summary, serializedSkills, cvUrl, imageUrl);

    revalidatePath('/');
    revalidatePath('/admin');
}

// Experience Actions
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

// Education Actions
export async function saveEducationItem(item: Omit<EducationItem, 'id'>, id?: string) {
    const { logoUrl, institution, degree, fieldOfStudy, startDate, endDate, description } = item;

    if (id) {
        const stmt = db.prepare('UPDATE resume_education SET logoUrl = ?, institution = ?, degree = ?, fieldOfStudy = ?, startDate = ?, endDate = ?, description = ? WHERE id = ?');
        stmt.run(logoUrl, institution, degree, fieldOfStudy, startDate, endDate, description, id);
    } else {
        const newId = Date.now().toString();
        const stmt = db.prepare('INSERT INTO resume_education (id, logoUrl, institution, degree, fieldOfStudy, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        stmt.run(newId, logoUrl, institution, degree, fieldOfStudy, startDate, endDate, description);
    }

    revalidatePath('/');
    revalidatePath('/admin');
}

export async function deleteEducationItem(id: string) {
    const stmt = db.prepare('DELETE FROM resume_education WHERE id = ?');
    stmt.run(id);
    revalidatePath('/');
    revalidatePath('/admin');
}

// Certification Actions
export async function saveCertificationItem(item: Omit<CertificationItem, 'id'>, id?: string) {
    const { name, issuingOrganization, issueDate, credentialUrl } = item;

    if (id) {
        const stmt = db.prepare('UPDATE resume_certifications SET name = ?, issuingOrganization = ?, issueDate = ?, credentialUrl = ? WHERE id = ?');
        stmt.run(name, issuingOrganization, issueDate, credentialUrl, id);
    } else {
        const newId = Date.now().toString();
        const stmt = db.prepare('INSERT INTO resume_certifications (id, name, issuingOrganization, issueDate, credentialUrl) VALUES (?, ?, ?, ?, ?)');
        stmt.run(newId, name, issuingOrganization, issueDate, credentialUrl);
    }
    
    revalidatePath('/');
    revalidatePath('/admin');
}

export async function deleteCertificationItem(id: string) {
    const stmt = db.prepare('DELETE FROM resume_certifications WHERE id = ?');
    stmt.run(id);
    revalidatePath('/');
    revalidatePath('/admin');
}
