import React, { useRef } from 'react';
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

  const stateRef = useRef();

  const handleClick = (ev) => {
    if (ev.target.nodeName == 'A' && stateRef.current) {
      stateRef.current.checked = false;
    }
  };

  return (
    <div className="navigation-container">
      <nav className="navigation" role="navigation" onClick={handleClick}>
        <input type="checkbox" id="navigation-state-root" className="navigation-state" aria-hidden={true} ref={stateRef} />
        <label htmlFor="navigation-state-root" className="navigation-toggle">
          <span className="navigation-toggle-open">
            <span className="navigation-toggle-bar" />
            <span className="navigation-toggle-bar" />
            <span className="navigation-toggle-bar" />
          </span>
          <span className="navigation-toggle-close">
            <span className="navigation-toggle-bar" />
            <span className="navigation-toggle-bar" />
          </span>
        </label>
        <Link id="navigation-home" to="/">
          <Logo size={32} theme="light" />
        </Link>
        <ul>
        {items.map(({ name, key, path, subnavigation }) => (
          <li className="subnavigation" key={key}>
          {subnavigation.length > 0 && (
            <>
              <input type="checkbox" id={`navigation-state-${key}`} className="navigation-state" aria-hidden={true} />
              <label htmlFor={`navigation-state-${key}`} className="navigation-toggle">
                <span className="navigation-toggle-open">
                  <svg viewBox="0 0 24 16" width="24" height="16">
                    <path d="M 4 4 L 12 12 L 20 4" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
                  </svg>
                </span>
                <span className="navigation-toggle-close">
                  <svg viewBox="0 0 24 16" width="24" height="16">
                    <path d="M 4 12 L 12 4 L 20 12" fill="none" strokeWidth="2" stroke="#ccc" strokeLinejoin="miter" />
                  </svg>
                </span>
              </label>
            </>
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
