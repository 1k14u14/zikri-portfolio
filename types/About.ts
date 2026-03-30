import { PortableTextBlock } from "sanity"

// 1. Create specific blueprints for your nested objects
export type Certification = {
  name: string;
  image: string;
  issuingOrganization: string; // <-- issueDate belongs inside the Certificate!
  issueDate: string;      // Optional, just in case you don't have a link
  expirationdDate: string;   // Optional, for expiration dates
  credentialId: string;  // Optional, for credential IDs
  credentialUrl: string; // Optional, for credential URLs
}

export type Experience = {
  company: string;
  image: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type Education = {
  institution: string;
  image: string;
  major: string;
  studyProgram: string;
  gpa: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

// 2. Attach those blueprints to your main About type
export type About = {
    _id: string;
    _createdAt: Date;
    title: string;
    avatar: string;
    resume: PortableTextBlock[];
    hardSkills: string[];
    softSkills: string[];
    
    // THE FIX: Replace 'string[]' with your new custom object arrays
    certification: Certification[];
    experience: Experience[];
    educations: Education[];
}