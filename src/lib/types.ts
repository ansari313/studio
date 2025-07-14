
export interface PortfolioItem {
  id: string | null;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tags: string[];
  projectUrl?: string;
}

export interface ResumeData {
  cardTitle: string;
  cardSubtitle: string;
  summary: string;
  skills: string[];
  experience: string;
  cvUrl: string;
  imageUrl: string;
}

export interface ContactSubmission {
  id: string | null;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}
