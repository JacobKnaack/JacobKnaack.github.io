import React, { useState, useEffect} from 'react';
import { GithubContext, fetchProjects, Project } from './GithubContext';

export default function GithubProvider({ children }: React.PropsWithChildren): React.ReactElement {

  const [repositories, setRepositories] = useState<Project[]>([]);

  const respositorySetter = (repositories: Project[]) => {
    setRepositories(repositories);
  }

  useEffect(() => {
    fetchProjects(respositorySetter, (e) => {
      console.log('GITHUB PROVIDER ERROR', e);
    });
  }, [])

  return (
    <GithubContext.Provider value={ repositories }>
      {children}
    </GithubContext.Provider>
  )
}