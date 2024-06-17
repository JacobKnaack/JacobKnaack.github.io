import { useContext } from 'react';
import { ContentContext } from '../../context/content/ContentContext';
import portrait from '/portrait.png';
import './header.css';

export default function Header() {

  const content = useContext(ContentContext);

  return (
    <section id="Header">
      <div className="column">
        <h2 id="welcome" className="display primary dark">{content.welcome_message}</h2>
        <p id="introduction" className="text secondary dark">{content.introduction}</p>
        <p className="description text primary dark">{content.profile_statement}</p>
        <a className="button-link dark" href="#Contact">
          Contact Me
        </a>
      </div>
      <div className="column">
        <img className="header-image" src={portrait} alt="Jacob Knaack, Web Developer, Instructor, Product Designer"/>
      </div>
    </section>
  )
}