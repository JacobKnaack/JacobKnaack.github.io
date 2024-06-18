import React from 'react';
import './nav.css';

export type NavItem = {
  url: string;
  text: string;
}

export interface NavProps {
  title: string;
  items: NavItem[];
}

export default function Nav({ title, items }: NavProps): React.ReactElement {
  const [modalNavActive, setModalNavActive] = React.useState(false);

  const handleModalNav = () => {
    setModalNavActive(navActive => !navActive);
  }

  return (
    <div id="nav-container">
      <div id="nav-content">
        <h1 id="nav-title" className="display">{title}</h1>
        <button onClick={handleModalNav} className="modal-button primary dark">&#9776;</button>
        <div className={`modal-background ${modalNavActive ? 'active' : ''}`} onClick={handleModalNav}></div>
        <nav className="nav-items">
          <ul className={`nav-item-list ${!modalNavActive ? 'hidden' : ''}`}>
            {items.map((item, idx) => (
              <li
                className="nav-item"
                key={idx}
                onClick={handleModalNav}>
                  <a
                    className="nav-link text"
                    href={item.url}>
                      {item.text}
                  </a>
              </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}