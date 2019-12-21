import React, { useState } from 'react';
import Logo from '../../Logo';

const Navigation = () => {
  let [ isOpen, setIsOpen ] = useState({
    root: false,
    home: false,
    galleries: false
  });

  const handleClickClose = (ev) => {
    ev.preventDefault();
    setIsOpen({ ...isOpen, [ev.target.dataset.id]: false });
  };

  const handleClickOpen = (ev) => {
    ev.preventDefault();
    setIsOpen({ ...isOpen, [ev.target.dataset.id]: true });
  };

  const getNavigationClassName = (id = 'root') => {
    const classNames = [ id == 'root' ? 'navigation' : 'subnavigation'];

    if (isOpen[id]) {
      classNames.push('navigation-open');
    } else {
      classNames.push('navigation-closed');
    }

    return classNames.join(' ');
  }

  return (
    <nav className={getNavigationClassName()} role="navigation">
      <span className="navigation-toggle">
        <a className="navigation-toggle-open" href="#" data-id="root" role="button" onClick={handleClickOpen} aria-label="Open menu">
          <span className="navigation-toggle-bar" />
          <span className="navigation-toggle-bar" />
          <span className="navigation-toggle-bar" />
        </a>
        <a className="navigation-toggle-close" href="#" data-id="root" role="button" onClick={handleClickClose} aria-label="Close menu">
          <span className="navigation-toggle-bar" />
          <span className="navigation-toggle-bar" />
        </a>
      </span>
      <a id="navigation-home" href="#">
        <Logo size={32} theme="light" />
      </a>
      <ul>
        <li className={getNavigationClassName('home')}>
          <span className="navigation-toggle">
            <a className="navigation-toggle-open" href="#" data-id="home" role="button" onClick={handleClickOpen} aria-label="Open home submenu">
              <svg viewBox="0 0 24 16" width="24" height="16">
                <path d="M 4 4 L 12 12 L 20 4" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
              </svg>
            </a>
            <a className="navigation-toggle-close" href="#" data-id="home" role="button" onClick={handleClickClose} aria-label="Close home submenu">
              <svg viewBox="0 0 24 16" width="24" height="16">
                <path d="M 4 12 L 12 4 L 20 12" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
              </svg>
            </a>
            <a href="#">
              Home
            </a>
          </span>
          <ul>
            <li>
              <a href="#">
                Introduction
              </a>
            </li>
            <li>
              <a href="#">
                Latest Images
              </a>
            </li>
            <li>
              <a href="#">
                Hall of fame
              </a>
            </li>
            <li>
              <a href="#">
                How to contribute
              </a>
            </li>
            <li>
              <a href="#">
                Partners
              </a>
            </li>
            <li>
              <a href="#">
                NOMP
              </a>
            </li>
            <li>
              <a href="#">
                HELCOM-PEG
              </a>
            </li>
            <li>
              <a href="#">
                Links
              </a>
            </li>
            <li>
              <a href="#">
                Literature
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Quick view
          </a>
        </li>
        <li>
          <a href="#">
            Taxon tree
          </a>
        </li>
        <li className={getNavigationClassName('galleries')}>
          <span className="navigation-toggle">
            <a className="navigation-toggle-open" href="#" data-id="galleries" role="button" onClick={handleClickOpen} aria-label="Open galleries submenu">
              <svg viewBox="0 0 24 16" width="24" height="16">
                <path d="M 4 4 L 12 12 L 20 4" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
              </svg>
            </a>
            <a className="navigation-toggle-close" href="#" data-id="galleries" role="button" onClick={handleClickClose} aria-label="Close galleries submenu">
              <svg viewBox="0 0 24 16" width="24" height="16">
                <path d="M 4 12 L 12 4 L 20 12" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
              </svg>
            </a>
            <a href="#">
              Galleries
            </a>
          </span>
          <ul>
            <li>
              <a href="#">
                HELCOM-PEG
              </a>
            </li>
            <li>
              <a href="#">
                NOMP
              </a>
            </li>
            <li>
              <a href="#">
                Kuylenstierna
              </a>
            </li>
            <li>
              <a href="#">
                Skagerrak-Kattegat
              </a>
            </li>
            <li>
              <a href="#">
                Norwegian Sea
              </a>
            </li>
            <li>
              <a href="#">
                Freshwater
              </a>
            </li>
            <li>
              <a href="#">
                Swedish benthic freshwater diatoms
              </a>
            </li>
            <li>
              <a href="#">
                Diatom resting stages
              </a>
            </li>
            <li>
              <a href="#">
                Dinoflagellate cysts
              </a>
            </li>
            <li>
              <a href="#">
                Other resting stages
              </a>
            </li>
            <li>
              <a href="#">
                Marine Research Institute - Iceland
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            Checklists
          </a>
        </li>
        <li>
          <a href="#">
            Tools
          </a>
        </li>
        <li>
          <a href="#">
            Contact
          </a>
        </li>
        <li>
          <a href="#">
            About
          </a>
        </li>
        <li>
          <a href="#">
            Help
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
