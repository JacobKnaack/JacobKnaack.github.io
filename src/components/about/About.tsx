import { useContext } from 'react';
import { ContentContext } from '../../context/content/ContentContext';
import screenshot from '/screenshot.jpg';
import './about.css';

export default function About() {

  const content = useContext(ContentContext);

  return (
    <section id="About">
      <div className="column">
        <img className="header-hero" src={screenshot} alt="Jacob Knaack, Web Developer, Instructor, Product Designer" />
      </div>
      <div className="column">
        <h2 className="primary dark display heading">Who is Jacob?</h2>
        <div className="description-container dark">
          {content.about_description.map((text, idx) => <p className="dark primary text" key={idx}>{text}</p>)}
        </div>
        <a className="button-link" href="#Contact">
          Contact Me
        </a>
      </div>
    </section>
  )
}