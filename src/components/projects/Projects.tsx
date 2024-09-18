import { useContext } from 'react';
import { ContentContext } from '../../context/content/ContentContext';
import { GithubContext } from '../../context/github/GithubContext';
import GhIcon from '../../assets/github.svg';
import './projects.css';

interface ProjectDetailsProps {
  label: string;
  text: string;
}

type Project = {
  name: string;
  description: string;
  language: string;
  visibility: string;
  stars: string | null;
  forks: string | null;
}

interface ProjectItemProps {
  project: Project;
}

const ProjectDetail = ({ label, text }: ProjectDetailsProps) => {
  return <p className="text project-data"><strong>{label}</strong> {text}</p>
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
  const formatLink = (repoName: string): string => {
    if (repoName.includes('/')) {
      return repoName;
    }
    return 'JacobKnaack/' + repoName;
  }
  return (
    <li className='project-card'>
      <a href={`https://github.com/${formatLink(project.name)}`} target="_blank">
        <div className="project-header">
          <h3 className="display project-name">{project.name}</h3>
          <img src={GhIcon} />
        </div>
        <p className="project-description text">{project.description}</p>
        <div className="project-details">
          <ProjectDetail label="Language: " text={project.language} />
          <ProjectDetail label="Visibility:" text={project.visibility} />
          {project.stars ? <ProjectDetail label="Stars: " text={project.stars} /> : null}
          {project.forks ? <ProjectDetail label="Forks: " text={project.forks} /> : null}
        </div>
      </a>
    </li>
  )
}

export default function Projects() {

  const content = useContext(ContentContext);
  const repositories = useContext(GithubContext);

  return (
    <section id="Projects">
      <div className="section-header">
        <h2 className="display primary dark heading">Projects</h2>
        <div className="page-description">
          {content.project_description.map((text, idx) => <p className="text primary dark" key={idx}>{text}</p>)}
        </div>
      </div>
      <div className="projects-container">
        <ul className="project-grid">
          {repositories.map((project, idx) => <ProjectItem key={idx} project={project} />)}
        </ul>
      </div>
    </section>
  )
}