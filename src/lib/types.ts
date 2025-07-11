export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface ResumeData {
  summary: string;
  skills: string[];
  experience: string;
  cvUrl: string;
}
