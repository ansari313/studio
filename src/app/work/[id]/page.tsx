
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getPortfolioItem } from '@/actions/portfolio-actions';
import { Separator } from '@/components/ui/separator';
import type { PortfolioItem } from '@/lib/types';
import { useState, useEffect } from 'react';

interface PortfolioDetailPageProps {
    params: { id: string };
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { id } = params;
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const portfolioItem = await getPortfolioItem(id);
        if (!portfolioItem) {
          notFound();
        } else {
          setItem(portfolioItem);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio item", error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
    setCurrentYear(new Date().getFullYear());
  }, [id]);

  if (loading) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <p>Loading...</p>
            </main>
        </div>
    );
  }

  if (!item) {
    // notFound() will be called inside useEffect, but as a fallback
    return notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 pt-24 pb-12 md:pb-24">
            <div className="container">
                <div className="mb-8">
                    <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <Link href="/#work">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to All Work
                        </Link>
                    </Button>
                </div>

                <article className="max-w-4xl mx-auto space-y-8 px-4">
                    <header className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{item.title}</h1>
                         <div className="flex flex-wrap items-center gap-2">
                            {item.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </header>

                    <Separator />
                    
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border shadow-lg">
                        {item.mediaType === 'image' ? (
                            <Image
                                src={item.mediaUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                                priority
                                data-ai-hint="abstract design"
                            />
                        ) : (
                            <video
                                src={item.mediaUrl}
                                controls
                                className="w-full h-full object-cover bg-black"
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>

                    <div 
                      className="prose prose-invert max-w-none text-muted-foreground text-lg whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: item.description }} 
                    />
                    
                    {item.projectUrl && (
                        <div className="pt-4">
                            <Button asChild>
                                <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    )}
                </article>
            </div>
        </main>
        <footer className="py-6 border-t border-border/50">
            <div className="container text-center text-sm text-muted-foreground">
                {currentYear && `© ${currentYear} FolioFlow. All rights reserved.`}
            </div>
      </footer>
    </div>
  );
}
