import { useContext } from 'react';
import { ContentContext } from '../../context/content/ContentContext';
import { GithubContext } from '../../context/github/GithubContext';
import GhIcon from '../../assets/github.svg';
import './projects.css';

interface ProjectDetailsProps {
  label: string;
  text: string;
}

const ProjectDetail = ({ label, text }: ProjectDetailsProps) => {
  return <p className="text project-data"><strong>{label}</strong> {text}</p>
}

export default function Projects() {

  const content = useContext(ContentContext);
  const repositories = useContext(GithubContext);
  const formatLink = (repoName: string): string => {
    if (repoName.includes('/')) {
      return repoName;
    } 
    return 'JacobKnaack/' + repoName;
  }

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
          {repositories.map((repo, idx) => {
            return (
              <li key={idx} className='project-card'>
                <a href={`https://github.com/${formatLink(repo.name)}`} target="_blank">
                  <div className="project-header">
                    <h3 className="display project-name">{repo.name}</h3>
                    <img src={GhIcon}/>
                  </div>
                  <p className="project-description text">{repo.description}</p>
                  <div className="project-details">
                    <ProjectDetail label="Language: " text={repo.language}/>
                    <ProjectDetail label="Visibility:" text={repo.visibility} />
                    {repo.stars ? <ProjectDetail label="Stars: " text={repo.stars} /> : null }
                    {repo.forks ? <ProjectDetail label="Forks: " text={repo.forks} /> : null }
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}