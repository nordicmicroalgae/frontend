import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';

const Navigation = () => {
  let [ isOpen, setIsOpen ] = useState({
    root: false,
    home: false,
    galleries: false
  });

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
            <a href="#">
              Home
            </a>
          </span>
          <ul>
            <li>
              <Link to="/">
                Introduction
              </Link>
            </li>
            <li>
              <Link to="/latest-images/">
                Latest Images
              </Link>
            </li>
            <li>
              <Link to="/hall-of-fame/">
                Hall of fame
              </Link>
            </li>
            <li>
              <Link to="/how-to-contribute/">
                How to contribute
              </Link>
            </li>
            <li>
              <Link to="/partners/">
                Partners
              </Link>
            </li>
            <li>
              <Link to="/nomp/">
                NOMP
              </Link>
            </li>
            <li>
              <Link to="/helcom-peg/">
                HELCOM-PEG
              </Link>
            </li>
            <li>
              <Link to="/links/">
                Links
              </Link>
            </li>
            <li>
              <Link to="/literature/">
                Literature
               </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/quic-view/">
            Quick view
          </Link>
        </li>
        <li>
          <Link to="/taxon-tree/">
            Taxon tree
          </Link>
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
              <Link to="/gallery/helcom-peg/">
                HELCOM-PEG
              </Link>
            </li>
            <li>
              <Link to="/gallery/nomp/">
                NOMP
              </Link>
            </li>
            <li>
              <Link to="/gallery/kuylenstierna/">
                Kuylenstierna
              </Link>
            </li>
            <li>
              <Link to="/gallery/skagerrak-kattegat/">
                Skagerrak-Kattegat
              </Link>
            </li>
            <li>
              <Link to="/gallery/norwegian-sea/">
                Norwegian Sea
              </Link>
            </li>
            <li>
              <Link to="/gallery/freshwater/">
                Freshwater
              </Link>
            </li>
            <li>
              <Link to="/gallery/swedish-benthic-freshwater-diatoms/">
                Swedish benthic freshwater diatoms
              </Link>
            </li>
            <li>
              <Link to="/gallery/diatom-resting-stages/">
                Diatom resting stages
              </Link>
            </li>
            <li>
              <Link to="/gallery/dinoflagellate-cysts/">
                Dinoflagellate cysts
              </Link>
            </li>
            <li>
              <Link to="/gallery/other-resting-stages/">
                Other resting stages
              </Link>
            </li>
            <li>
              <Link to="/gallery/marine-research-institute-iceland/">
                Marine Research Institute - Iceland
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/checklists/">
            Checklists
          </Link>
        </li>
        <li>
          <Link to="/tools/">
            Tools
          </Link>
        </li>
        <li>
          <Link to="/contact/">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/about/">
            About
          </Link>
        </li>
        <li>
          <Link to="/help/">
            Help
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
