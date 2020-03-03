import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../Logo';
import getKey from '../../../utils/getKey';
import settings from '../../../settings.json';

const Navigation = () => {

  const setup = ({ name, path, subnavigation }) => ({
    name,
    path,
    key: getKey(name),
    subnavigation: subnavigation ? subnavigation.map(setup) : []
  });

  const items = settings.ui.navigation.map(setup);

  const initialOpenState = {root: false};

  items.forEach(( { key, subnavigation }) => {
    if (subnavigation.length > 0) {
      initialOpenState[key] = false;
    }
  });

  let [ isOpen, setIsOpen ] = useState({ ...initialOpenState });

  const handleClickClose = (ev) => {
    ev.preventDefault();
    const targetId = ev.currentTarget.dataset.id;
    setIsOpen({ ...isOpen, [targetId]: false });
  };

  const handleClickOpen = (ev) => {
    ev.preventDefault();
    const targetId = ev.currentTarget.dataset.id;
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
        {items.map(({ name, key, path, subnavigation }) => (
          <li className={getNavigationClassName(key)} key={key}>
          {subnavigation.length > 0 && (
            <span className="navigation-toggle">
              <a className="navigation-toggle-open" href="#" data-id={key} role="button" onClick={handleClickOpen} aria-label={`Open ${name} submenu`}>
                <svg viewBox="0 0 24 16" width="24" height="16">
                  <path d="M 4 4 L 12 12 L 20 4" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
                </svg>
              </a>
              <a className="navigation-toggle-close" href="#" data-id={key} role="button" onClick={handleClickClose} aria-label={`Close ${name} submenu`}>
                <svg viewBox="0 0 24 16" width="24" height="16">
                  <path d="M 4 12 L 12 4 L 20 12" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
                </svg>
              </a>
            </span>
          )}
            <NavLink
              to={path}
              isActive={(_,{ pathname }) => (
                subnavigation.length > 0 ? (
                  subnavigation.map(({ path }) => path).includes(pathname)
                ) : (
                  path === pathname
                )
              )}
            >
              {name}
            </NavLink>
            {subnavigation.length > 0 && (
              <div className="subnavigation-container">
                <ul>
                {subnavigation.map(({ name, key, path }) => (
                  <li key={key}>
                    <NavLink exact to={path}>
                      {name}
                    </NavLink>
                  </li>
                ))}
                </ul>
              </div>
            )}
          </li>
        ))}
        </ul>
      </nav>
    </div>
  );

};

export default Navigation;
