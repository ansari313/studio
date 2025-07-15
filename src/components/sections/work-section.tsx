
'use client';

import PortfolioGrid from '@/components/portfolio-grid';

export default function WorkSection() {
    return (
        <section id="work" className="py-16 md:py-24 bg-secondary/20 animate-slide-in-up">
           <div className="container">
              <PortfolioGrid />
           </div>
        </section>
    );
}
