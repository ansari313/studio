import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioItemCardProps {
  item: PortfolioItem;
}

export default function PortfolioItemCard({ item }: PortfolioItemCardProps) {
  return (
    <Link href={`/work/${item.id}`} className="group block">
        <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
            <div className="aspect-video relative">
            <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint="web design"
            />
            </div>
            <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="line-clamp-3 h-[60px]">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                    {tag}
                    </Badge>
                ))}
                </div>
            </CardContent>
        </Card>
    </Link>
  );
}
