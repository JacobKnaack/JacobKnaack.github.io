import { createContext } from 'react';

export type Service = {
  name: string;
  description: string;
}

export type Experience = {
  dates: ExperienceDate,
  title: string;
  company: string;
  description: string;
}

export type ExperienceDate = {
  start: string;
  end: string;
}

export type ContactInfo = {
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedIn: string;
}

/** Define types for context content */
export interface IContent {
  title: string;
  welcome_message: string;
  introduction: string;
  profile_statement: string;
  about_description: string[];
  project_description: string[];
  service_description: string[];
  experience_description: string[];
  contact_description: string[];
  services: Service[];
  experiences: Experience[];
  contact_info: ContactInfo
}

export const initialContextValue: IContent = {
  title: "",
  welcome_message: "",
  introduction: "",
  profile_statement: "",
  about_description: [],
  service_description: [],
  services: [],
  project_description: [],
  experience_description: [],
  experiences: [],
  contact_description: [],
  contact_info: {
    location: '',
    phone: '',
    email: '',
    github: '',
    linkedIn: ''
  }
}

export const ContentContext = createContext<IContent>(initialContextValue);
