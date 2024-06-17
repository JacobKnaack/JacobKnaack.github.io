import { useContext } from 'react';
import { ContentContext } from '../../context/content/ContentContext';
import ServiceIcon from '../../assets/services.svg';
import EducationIcon from '../../assets/education.svg';
import ProductIcon from '../../assets/product.svg';
import './services.css';

export default function Services() {

  const content = useContext(ContentContext);
  const nameToIcon = (name: string) => {
    switch(name) {
      case 'Web Services':
        return ServiceIcon;
      case 'Education':
        return EducationIcon;
      case 'Product Development':
        return ProductIcon;
      default:
        return ServiceIcon;
    }
  }

  return (
    <section id="Services">
      <div className="section-header">
        <h2 className="display primary dark heading">Services</h2>
        <div className="page-description">
          {content.service_description.map((text, idx) => <p className="text primary dark" key={idx}>{text}</p>)}
        </div>
      </div>
      <div id="service-container">
        <ul id="service-list">
          {content.services.map((service, idx) => {
            return (
              <li className="service-card" key={idx}>
                <img className="service-icon" src={nameToIcon(service.name)}/>
                <h3 className="title display">{service.name}</h3>
                <p className="description text">{service.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}