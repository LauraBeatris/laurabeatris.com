export type Stack = {
  id: string;
  language: string;
  framework?: string;
  libraries: Array<string>;
  categories: Array<string>;
  databases?: Array<string>;
}

export type Asset = {
  id: string;
  url: string;
}

export type Project = {
  id: string;
  title: string;
  stack: Stack;
  githubUrl: string;
  liveUrl?: string;
  mainImage: Asset;
  description?: string;
}

export type Achievement = {
  id: string;
  title: string;
  description?: string;
}

export type Timeline = {
  id: string;
  year: number;
  achievements: Array<Achievement>
}

export type Content = {
  id: string;
  url: string;
  title: string;
  image: Asset;
  subtitle?: string;
}

export type Resource = {
  id: string;
  url: string;
  label: string;
}

export type LearningJournal = {
  id: string;
  date: Date;
  work: Array<string>;
  resources?: Array<Resource>;
  curiosity?: Array<string>;
  programming?: Array<string>;
}

export type TransformedStack = {
  languages: Array<string>,
  libraries: Array<string>,
  databases: Array<string>,
  categories: Array<string>,
  frameworks: Array<string>
}

export enum StackCategory {
  'Backend',
  'Mobile',
  'Package',
  'Frontend',
}
