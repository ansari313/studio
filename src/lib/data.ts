import type { PortfolioItem, ResumeData } from '@/lib/types';

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'A cutting-edge web application built with Next.js and Tailwind CSS, focusing on a seamless user experience and high performance.',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    tags: ['Web App', 'Next.js', 'React'],
  },
  {
    id: '2',
    title: 'Mobile App Concept Video',
    description: 'A video walkthrough of a mobile application concept aimed at improving daily productivity. Designed in Figma and animated in After Effects.',
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    mediaType: 'video',
    tags: ['UI/UX', 'Mobile App', 'Video'],
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with a custom backend, payment gateway integration, and a responsive storefront.',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    tags: ['E-commerce', 'Full-stack', 'Stripe'],
  },
  {
    id: '4',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets, built with D3.js and React.',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    tags: ['Data Viz', 'D3.js', 'React'],
  },
    {
    id: '5',
    title: 'Cloud Infrastructure Setup',
    description: 'Architecture and deployment of a scalable cloud infrastructure on AWS for a high-traffic application.',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    tags: ['Cloud', 'AWS', 'DevOps'],
  },
  {
    id: '6',
    title: 'Brand Identity Design',
    description: 'Complete branding package for a new startup, including logo, color palette, and typography guidelines.',
    mediaUrl: 'https://placehold.co/600x400.png',
    mediaType: 'image',
    tags: ['Branding', 'Graphic Design', 'Logo'],
  },
];


export const mockResumeData: ResumeData = {
    sectionTitle: 'My Resume',
    sectionDescription: 'A brief overview of my skills and experience.',
    cardTitle: 'Curriculum Vitae',
    cardSubtitle: 'Software Engineer & Web Developer',
    summary: 'Dynamic and innovative software engineer with a knack for creating robust web applications from the ground up. Proficient in modern frameworks and passionate about clean code and user-centric design.',
    skills: ['Next.js & React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GenAI Integration', 'Cloud Deployment'],
    experience: 'Detailed work history available in the full downloadable resume.',
    cvUrl: '/cv.pdf',
    imageUrl: 'https://placehold.co/100x100.png'
};
