import React, { useContext, useRef, useState } from 'react';
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
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const content = useContext(ContentContext);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="Experience">
      <div className="section-header">
        <h2 className="display primary dark heading">My Experiences</h2>
        <div className="page-description primary dark text">
          {content.experience_description.map((text, idx) => <p className="description" key={idx}>{text}</p>)}
        </div>
      </div>
      <div className="card-list-container">
        <ul
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the element
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="card-list"
        >
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