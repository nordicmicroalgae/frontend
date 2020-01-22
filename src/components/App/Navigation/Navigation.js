import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../Logo';

const Navigation = () => {
  const initialOpenState = {
    root: false,
    home: false,
    galleries: false
  };

  let [ isOpen, setIsOpen ] = useState({ ...initialOpenState });

  const handleClickClose = (ev) => {
    ev.preventDefault();
    const targetId = (
      ev.target.dataset.id || ev.target.parentElement.dataset.id
    );
    setIsOpen({ ...isOpen, [targetId]: false });
  };

  const handleClickOpen = (ev) => {
    ev.preventDefault();
    const targetId = (
      ev.target.dataset.id || ev.target.parentElement.dataset.id
    );
    setIsOpen({ ...isOpen, [targetId]: true });
  };

  const handleClick = (ev) => {
    const shouldClose = (
      ev.target.nodeName == 'A' && !ev.target.className.includes('toggle')
    );
    if (shouldClose) {
      setIsOpen({ ...initialOpenState });
    }
  };

  const getNavigationClassName = (id = 'root') => {
    const classNames = [ id == 'root' ? 'navigation' : 'subnavigation'];

    if (isOpen[id]) {
      classNames.push('navigation-open');
    }

    return classNames.join(' ');
  }

  return (
    <div className="navigation-container">
    <nav className={getNavigationClassName()} role="navigation" onClick={handleClick}>
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
      <Link id="navigation-home" to="/">
        <Logo size={32} theme="light" />
      </Link>
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
            <NavLink exact to="/">
              Home
            </NavLink>
          </span>
          <ul>
            <li>
              <NavLink exact to="/">
                Introduction
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/latest-images/">
                Latest Images
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/hall-of-fame/">
                Hall of fame
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/how-to-contribute/">
                How to contribute
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/partners/">
                Partners
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/nomp/">
                NOMP
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/helcom-peg/">
                HELCOM-PEG
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/links/">
                Links
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/literature/">
                Literature
               </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink exact to="/quick-view/">
            Quick view
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/taxon-tree/">
            Taxon tree
          </NavLink>
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
            <NavLink to="/gallery/">
              Galleries
            </NavLink>
          </span>
          <ul>
            <li>
              <NavLink exact to="/gallery/helcom-peg/">
                HELCOM-PEG
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/nomp/">
                NOMP
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/kuylenstierna/">
                Kuylenstierna
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/skagerrak-kattegat/">
                Skagerrak-Kattegat
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/norwegian-sea/">
                Norwegian Sea
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/freshwater/">
                Freshwater
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/swedish-benthic-freshwater-diatoms/">
                Swedish benthic freshwater diatoms
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/diatom-resting-stages/">
                Diatom resting stages
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/dinoflagellate-cysts/">
                Dinoflagellate cysts
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/other-resting-stages/">
                Other resting stages
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/gallery/marine-research-institute-iceland/">
                Marine Research Institute - Iceland
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink exact to="/checklists/">
            Checklists
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/tools/">
            Tools
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/contact/">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/about/">
            About
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/help/">
            Help
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navigation;
