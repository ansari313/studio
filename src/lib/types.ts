
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

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string; // "MM/YYYY"
  endDate: string; // "MM/YYYY" or "Present"
  description?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string; // "MM/YYYY"
  credentialUrl?: string;
}

export interface ResumeData {
  cardTitle: string;
  cardSubtitle: string;
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
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
