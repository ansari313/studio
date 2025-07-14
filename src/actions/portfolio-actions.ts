'use server';

import db from '@/lib/db';
import type { PortfolioItem } from '@/lib/types';
import { revalidatePath } from 'next/cache';

// Helper to deserialize tags
const deserializeItem = (item: any): PortfolioItem => ({
    ...item,
    tags: JSON.parse(item.tags || '[]'),
});

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    const items = db.prepare('SELECT * FROM portfolio_items ORDER BY createdAt DESC').all();
    return items.map(deserializeItem);
}

export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
    const item = db.prepare('SELECT * FROM portfolio_items WHERE id = ?').get(id);
    if (!item) return null;
    return deserializeItem(item);
}

export async function savePortfolioItem(itemData: Omit<PortfolioItem, 'id'>, id?: string) {
    const { title, description, mediaUrl, mediaType, tags, projectUrl } = itemData;
    const serializedTags = JSON.stringify(tags);
    
    if (id) {
        // Update existing item
        const stmt = db.prepare('UPDATE portfolio_items SET title = ?, description = ?, mediaUrl = ?, mediaType = ?, tags = ?, projectUrl = ? WHERE id = ?');
        stmt.run(title, description, mediaUrl, mediaType, serializedTags, projectUrl, id);
    } else {
        // Create new item
        const newId = Date.now().toString();
        const stmt = db.prepare('INSERT INTO portfolio_items (id, title, description, mediaUrl, mediaType, tags, projectUrl) VALUES (?, ?, ?, ?, ?, ?, ?)');
        stmt.run(newId, title, description, mediaUrl, mediaType, serializedTags, projectUrl);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/work/${id}`);
}

export async function deletePortfolioItem(id: string) {
    const stmt = db.prepare('DELETE FROM portfolio_items WHERE id = ?');
    stmt.run(id);
    revalidatePath('/');
    revalidatePath('/admin');
}
