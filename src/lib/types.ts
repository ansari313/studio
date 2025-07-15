
export interface PortfolioItem {
  id: string | null;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tags: string[];
  projectUrl?: string;
}

export interface ExperienceItem {
  id: string;
  logoUrl: string;
  companyName: string;
  position: string;
  startDate: string; // "MM/YYYY"
  endDate: string; // "MM/YYYY" or "Present"
  description: string;
  sortOrder: number;
}

export interface ResumeData {
  cardTitle: string;
  cardSubtitle: string;
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
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
