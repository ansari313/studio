
export interface PortfolioItem {
  id: string | null;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tags: string[];
}

export interface ResumeData {
  sectionTitle: string;
  sectionDescription: string;
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
