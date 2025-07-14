import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getPortfolioItem } from '@/actions/portfolio-actions';

interface PortfolioDetailPageProps {
    params: { id: string };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { id } = params;
  const item = await getPortfolioItem(id);
  const currentYear = new Date().getFullYear();

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12 md:py-24">
            <div className="container">
                <div className="mb-8">
                    <Button asChild variant="ghost">
                        <Link href="/#work">
                            <ArrowLeft className="mr-2" />
                            Back to All Work
                        </Link>
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto grid gap-12">
                    
                    {/* 1. Media Display */}
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
                    
                    <div className='space-y-8'>
                        {/* 2. Project Name */}
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{item.title}</h1>
                        
                        {/* 3. Project Link */}
                        {item.projectUrl && (
                            <div>
                                <h2 className="text-2xl font-bold mb-3">Project Link</h2>
                                <Button asChild variant="outline">
                                    <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                                        View Project <ExternalLink className="ml-2" />
                                    </a>
                                </Button>
                            </div>
                        )}

                        {/* 4. Project Details */}
                        <div>
                           <h2 className="text-2xl font-bold mb-3">About this project</h2>
                           <div className="prose prose-lg dark:prose-invert max-w-none">
                              <p>{item.description}</p>
                           </div>
                        </div>

                        {/* 5. Tags */}
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Tags</h2>
                            <div className="flex flex-wrap gap-2 items-center">
                                {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer className="py-6 border-t">
            <div className="container text-center text-sm text-muted-foreground">
                © {currentYear} FolioFlow. All rights reserved.
            </div>
      </footer>
    </div>
  );
}
