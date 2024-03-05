import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { matchSorter } from 'match-sorter';

import Authority from 'Components/Authority';
import { SearchIcon } from 'Components/Icons';
import ScientificName from 'Components/ScientificName';
import Synonym from 'Components/Synonym';
import Placeholder from 'Components/Placeholder';
import getKey from 'Utilities/getKey';
import useCombinedNamesQuery from './useCombinedNamesQuery';


const propTypes = {
  onClose: PropTypes.func.isRequired,
  limit: PropTypes.number,
};

const defaultProps = {
  limit: 50,
};

const SearchView = ({ onClose, limit }) => {
  const history = useHistory();

  const query = useCombinedNamesQuery();

  const inputRef = useRef();

  const [ inputValue, setInputValue ] = useState('');

  const [ selectedIndex, setSelectedIndex ] = useState(0);

  const matches = useMemo(() => {
    const terms = inputValue.split(' ');

    return terms.reduceRight(
      (results, term) =>
        matchSorter(
          results,
          term,
          {
            keys: ['authority', 'scientificName'],
            threshold: matchSorter.rankings.CONTAINS,
          }
        ),
        query.data
    ).slice(0, limit);
  }, [inputValue, query]);


  useEffect(() => {
    inputRef.current.focus();

    document.body.classList.add('has-overlay');

    return () => (
      document.body.classList.remove('has-overlay')
    );
  }, []);


  const KeyHandlers = {
    ArrowDown(ev) {
      ev.preventDefault();
      setSelectedIndex(
        selectedIndex >= matches.length - 1 ? 0 : selectedIndex + 1
      );
    },
    ArrowUp(ev) {
      ev.preventDefault();
      setSelectedIndex(
        selectedIndex <= 0 ? matches.length - 1 : selectedIndex - 1
      );
    },
    Enter(ev) {
      ev.preventDefault();
      if (matches[selectedIndex]) {
        history.push(
          `/taxon/${matches[selectedIndex].slug}/`
        );
        onClose(ev);
      }
    },
    Escape(ev) {
      onClose(ev);
    },
    dispatch(ev) {
      if (KeyHandlers[ev.key]) {
        KeyHandlers[ev.key].call(this, ev);
      }
    }
  };

  const handleInputChange = ev => {
    setInputValue(ev.target.value);
  };

  const handleClickClear = _ev => {
    setInputValue('');
    inputRef.current.focus();
  };


  const showLoading = (
    inputValue.length > 0 && query.isLoading
  );

  const showResults = (
    inputValue.length > 0 && query.isSuccess
  );


  return createPortal((
    <div className="search-view-container">
      <div
        className="search-view"
        role="dialog"
        aria-labelledby="search-label"
        aria-modal="true"
      >
        <div className="search-view-header">
          <div
            id="search-controls"
            aria-haspopup="listbox"
            aria-owns="search-results"
            aria-expanded={showLoading || showResults}
          >
            <label id="search-label" htmlFor="search-input">
              <span aria-hidden="true">
                <SearchIcon />
              </span>
              <span className="label-text">
                Search taxa
              </span>
            </label>
            <input
              type="search"
              id="search-input"
              placeholder="Enter search term..."
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={KeyHandlers.dispatch}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-labelledby="search-label"
              aria-activedescendant={
                `search-result-item-${selectedIndex}`
              }
            />
            <button
              type="button"
              id="search-clear"
              aria-label="Clear"
              onClick={handleClickClear}
            >
              <span aria-hidden="true">
                &times;
              </span>
            </button>
          </div>
          <button
            type="button"
            className="search-view-close"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <div className="search-view-content">
          <ul
            role="listbox"
            id="search-results"
            aria-labelledby="search-label"
          >
            {showLoading && (
              Array(4).fill().map((_value, index) => (
                <li key={getKey('search', 'result', 'faux', index)}>
                  <span className="faux-link"><Placeholder /></span>
                </li>
              ))
            )}
            {showResults && (
              matches.map((nameMatch, index) => (
                <li
                  role="option"
                  key={getKey('search', 'result', nameMatch.key)}
                  id={`search-result-item-${index}`}
                  onMouseOver={_ev => setSelectedIndex(index)}
                  onClick={onClose}
                  aria-selected={selectedIndex === index}
                >
                  <Link to={`/taxon/${nameMatch.slug}/`} className="search-link">
                    {nameMatch.status == 'synonym' ? (
                      <Synonym currentName={nameMatch.currentName}>
                        {nameMatch.scientificName}
                      </Synonym>
                    ) : (
                      <ScientificName>
                        {nameMatch.scientificName}
                      </ScientificName>
                    )}
                    {nameMatch.authority ? (
                      <>
                        {' '}
                        <Authority>
                          {nameMatch.authority}
                        </Authority>
                      </>
                    ) : (
                      null
                    )}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  ), document.body);
};

SearchView.propTypes = propTypes;

SearchView.defaultProps = defaultProps;


export default SearchView;
