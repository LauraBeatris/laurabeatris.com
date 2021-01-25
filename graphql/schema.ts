export type Stack = {
  language: string;
  framework?: string;
  libraries: Array<string>;
  categories: Array<string>;
  databases?: Array<string>;
}

export type Project = {
  title: string;
  stack: Stack;
  githubUrl: string;
  liveUrl?: string;
  description?: string;
}

export type Achievement = {
  id: string;
  title: string;
  description?: string;
}

export type Timeline = Array<{
  id: string;
  year: number;
  achievements: Array<Achievement>
}>
