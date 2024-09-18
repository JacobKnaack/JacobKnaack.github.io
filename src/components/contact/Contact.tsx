import './contact.css';
import { useContext } from 'react';
import { ContentContext } from '../../context/content/ContentContext';
import GhIcon from '../../assets/github.svg';
import LiIcon from '../../assets/linkedin.svg';
import ContactForm from './ContactForm';

export default function Contact() {
  const content = useContext(ContentContext);

  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const formattedNumber = `+1(${cleaned.substring(0, 3)})-${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    return formattedNumber;
  }

  return (
    <section id="Contact">
      <h2 className="display primary dark">Contact Me</h2>
      <div className="page-description">
        {content.contact_description.map((text, idx) => <p className="text primary dark" key={idx}>{text}</p>)}
      </div>
      <div className="contact-info-container">
        <ContactForm />
        <div>
          <p className="text primary dark">Location: {content.contact_info.location}</p>
          <p className="text primary dark">Phone: {formatPhoneNumber(content.contact_info.phone)}</p>
          <p className="text primary dark">Email: {content.contact_info.email}</p>
        </div>
        <div className="contact-info-social-container">
          <a className="contact-link" href={`https://github.com/${content.contact_info.github}`} target="_blank">
            <img src={GhIcon} />
          </a>
          <a className="contact-link" href={`https://linkedin.com/in/${content.contact_info.linkedIn}`} target="_blank">
            <img src={LiIcon}/>
          </a>
        </div>
      </div>
    </section>
  )
}
