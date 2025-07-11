import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioItemCardProps {
  item: PortfolioItem;
}

export default function PortfolioItemCard({ item }: PortfolioItemCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="aspect-video relative mb-4">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint="web design"
          />
        </div>
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
  );
}
