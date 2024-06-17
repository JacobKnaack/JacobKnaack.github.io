import { useContext } from 'react';
import { ContentContext } from '../../context/content/ContentContext';
import './experience.css';

interface CardProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

const Card = ({ date, title, subtitle, description }: CardProps) => {
  return (
    <div className="card">
      <div>
        <h3 className="card-date text">{date}</h3>
        <p className="card-title display">{title}</p>
        <p className="card-subtitle text">{subtitle}</p>
      </div>
      <div>
        <p className="card-description text">{description}</p>
      </div>
    </div>
  )
}

export default function Experience() {

  const content = useContext(ContentContext);

  return (
    <section id="Experience">
      <div className="section-header">
        <h2 className="display primary dark heading">My Experiences</h2>
        <div className="page-description primary dark text">
          {content.experience_description.map((text, idx) => <p className="description" key={idx}>{text}</p>)}
        </div>
      </div>
      <div className="card-list-container">
        <ul className="card-list">
          {content.experiences.map((experience, idx) => {
            return (
              <li key={idx}>
                <Card 
                  date={`${experience.dates.start} - ${experience.dates.end}`}
                  title={experience.title}
                  subtitle={experience.company}
                  description={experience.description}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}