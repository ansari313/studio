
export interface PortfolioItem {
  id: string;
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
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

// Key for storing portfolio items in localStorage
export const PORTFOLIO_STORAGE_KEY = 'folioflow_portfolio_items';
export const CONTACT_SUBMISSIONS_STORAGE_KEY = 'folioflow_contact_submissions';
