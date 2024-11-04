import { createContext } from 'react';

const GITHUB_API_URL = '/github.json';

export type Project = {
  name: string;
  url: string;
  description: string;
  language: string;
  visibility: string;
  stars: string;
  forks: string;
}

export const githubContextValue: Project[] = [];

export type Setter = (arg0: Project[]) => void;

export type ErrorHandler = (arg0: unknown) => void;

export async function fetchProjects(setter: Setter, onError: ErrorHandler): Promise<void> {
  fetch(GITHUB_API_URL)
  .then(response => response.json())
  .then(json => {
    setter(json.repositories);
  })
  .catch(e => {
    console.error('ERROR FETCHING GITHUB REPOS', e);
    onError(e);
  });
}

export const GithubContext = createContext<Project[]>(githubContextValue);
