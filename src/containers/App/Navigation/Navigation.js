import React, { useEffect, useState ,useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useLocation } from 'react-router-dom';

import SearchView from 'Containers/SearchView';
import Logo from 'Components/Logo';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon, UserIcon } from 'Components/Icons';
import getKey from 'Utilities/getKey';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      subnavigation: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired
};

const Navigation = ({ items }) => {
  const location = useLocation();

  const [ showSearchView, setShowSearchView ] = useState(false);

  const stateRef = useRef();

  useEffect(() => {
    if (stateRef.current) {
      stateRef.current.checked = false;
    }
  }, [ location ]);

  const handleClickSearch = (ev) => {
    if (stateRef.current) {
      stateRef.current.checked = false;
    }
    setShowSearchView(!showSearchView);
  };

  const handleCloseSearchView = (_ev) => {
    setShowSearchView(false);
  };

  const withKey = (item) => ({ ...item, key: getKey(item.name)});

  return (
    <div className="navigation-container">
      <nav className="navigation" role="navigation">
        <a
          id="navigation-admin"
          aria-label="Log in"
          title="Manage your contributions"
          href="/admin/"
        >
          <UserIcon />
        </a>
        <button
          type="button"
          id="search-button"
          aria-label="Search"
          onClick={handleClickSearch}
        >
          <SearchIcon />
        </button>
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
        {items.map(withKey).map(({ name, key, path, subnavigation }) => (
          <li className="subnavigation" key={key}>
          {subnavigation && subnavigation.length > 0 && (
            <>
              <input type="checkbox" id={`navigation-state-${key}`} className="navigation-state" aria-hidden={true} />
              <label htmlFor={`navigation-state-${key}`} className="navigation-toggle">
                <span className="navigation-toggle-open">
                  <ChevronDownIcon />
                </span>
                <span className="navigation-toggle-close">
                  <ChevronUpIcon />
                </span>
              </label>
            </>
          )}
            <NavLink
              to={path}
              isActive={(_,{ pathname }) => (
                subnavigation && subnavigation.length > 0 ? (
                  subnavigation.map(({ path }) => path).includes(pathname)
                ) : (
                  path === pathname
                )
              )}
            >
              {name}
            </NavLink>
            {subnavigation && subnavigation.length > 0 && (
              <div className="subnavigation-container">
                <ul>
                {subnavigation.map(withKey).map(({ name, key, path }) => (
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
      {showSearchView && (
        <SearchView onClose={handleCloseSearchView} />
      )}
    </div>
  );

};

Navigation.propTypes = propTypes;

export default Navigation;
