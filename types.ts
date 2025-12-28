
export enum AppView {
  DASHBOARD = 'dashboard',
  CONSULTANT = 'consultant',
  SCHOLARSHIPS = 'scholarships',
  SOP_LOR = 'sop_lor'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface UniversityRecommendation {
  name: string;
  country: string;
  course: string;
  budget: string;
  roi_score: number;
  description: string;
}

export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  link: string;
}

export interface WritingAnalysis {
  feedback: string;
  suggestions: string[];
  structureScore: number;
}
