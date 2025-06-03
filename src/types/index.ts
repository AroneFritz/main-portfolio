export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: ProjectCategory;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "planned";
  startDate: string;
  endDate?: string;
  challenges?: string[];
  learnings?: string[];
  metrics?: ProjectMetric[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export type ProjectCategory = 
  | "web-app" 
  | "mobile-app" 
  | "api" 
  | "library" 
  | "tool" 
  | "game" 
  | "other";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
}

export type SkillCategory = 
  | "frontend" 
  | "backend" 
  | "database" 
  | "devops" 
  | "mobile" 
  | "design" 
  | "other";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  location: string;
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  achievements?: string[];
  location: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  rating?: number;
  date: string;
  projectId?: string;
  status?: 'pending' | 'approved' | 'rejected';
  submissionDate?: string;
  approvalDate?: string;
}

export interface TestimonialSubmission {
  name: string;
  email: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  projectWorkedOn?: string;
  allowContact?: boolean;
  profilePhoto?: File;
}



export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  fonts: {
    sans: string;
    mono: string;
  };
}
