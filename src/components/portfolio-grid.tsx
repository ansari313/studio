'use client';

import { useState, useMemo, useEffect } from 'react';
import PortfolioItemCard from './portfolio-item-card';
import { Input } from './ui/input';
import { mockPortfolioItems } from '@/lib/data';
import type { PortfolioItem } from '@/lib/types';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/types';

export default function PortfolioGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (storedData) {
        setItems(JSON.parse(storedData));
      } else {
        setItems(mockPortfolioItems);
      }
    } catch (e) {
      console.error("Failed to load portfolio data, using mock data.", e);
      setItems(mockPortfolioItems);
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, items]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">My Work</h2>
        <p className="text-muted-foreground mt-2">A selection of my recent projects.</p>
      </div>
      <div className="mb-8 max-w-sm mx-auto">
        <Input
          type="text"
          placeholder="Search projects by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <PortfolioItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects found for your search.</p>
        </div>
      )}
    </div>
  );
}
