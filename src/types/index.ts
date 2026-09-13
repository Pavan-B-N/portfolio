export interface SocialLinks {
  github: string;
  linkedin: string;
  leetcode: string;
  email: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  initials: string;
  photo: string;
  role: string;
  taglineWords: string[];
  location: string;
  email: string;
  summary: string;
  summarySecondary: string;
  resumeUrl: string;
  contactBlurb: string;
  socials: SocialLinks;
  stats: Stat[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  bullets: string[];
}

export type ProjectSize = 'small' | 'medium' | 'large';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  featured: boolean;
  size: ProjectSize;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  code: string;
  issuer: string;
  credentialId: string;
  earnedOn: string;
  image: string;
  verifyUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  link: string | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  gpa: string;
}

export interface GalleryPhoto {
  id: string;
  image: string;
  caption: string;
}
