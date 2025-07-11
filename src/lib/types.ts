export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tags: string[];
}

export interface ResumeData {
  summary: string;
  skills: string[];
  experience: string;
  cvUrl: string;
}

// Key for storing portfolio items in localStorage
export const PORTFOLIO_STORAGE_KEY = 'folioflow_portfolio_items';
