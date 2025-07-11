
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { Loader2, ArrowLeft } from 'lucide-react';
import type { PortfolioItem } from '@/lib/types';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/types';
import { mockPortfolioItems } from '@/lib/data';

export default function PortfolioDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        try {
            const storedData = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
            const items: PortfolioItem[] = storedData ? JSON.parse(storedData) : mockPortfolioItems;
            const foundItem = items.find((i) => i.id === id);
            if (foundItem) {
                setItem(foundItem);
            }
        } catch (e) {
            console.error("Failed to load portfolio item", e);
        } finally {
            setLoading(false);
        }
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!item) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center text-center p-4">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-muted-foreground mb-8">The project you are looking for does not exist.</p>
                    <Button asChild>
                        <Link href="/#work">
                            <ArrowLeft className="mr-2" />
                            Back to My Work
                        </Link>
                    </Button>
                </div>
            </main>
            <footer className="py-6 border-t">
                <div className="container text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} FolioFlow. All rights reserved.
                </div>
            </footer>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12 md:py-24">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Button asChild variant="ghost">
                            <Link href="/#work">
                                <ArrowLeft className="mr-2" />
                                Back to All Work
                            </Link>
                        </Button>
                    </div>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{item.title}</h1>
                    </div>
                    
                    <div className="flex justify-center mb-8">
                        <div className="relative aspect-video w-full max-w-3xl rounded-lg overflow-hidden border">
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
                                    className="w-full h-full object-cover"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-center mb-8">
                       <p>{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center justify-center">
                        <h3 className="text-lg font-semibold mr-2">Tags:</h3>
                        {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </main>
        <footer className="py-6 border-t">
            <div className="container text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} FolioFlow. All rights reserved.
            </div>
      </footer>
    </div>
  );
}
