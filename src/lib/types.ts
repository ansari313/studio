
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

// Key for storing portfolio items in localStorage
export const PORTFOLIO_STORAGE_KEY = 'folioflow_portfolio_items';
