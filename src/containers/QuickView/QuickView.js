import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { ChevronDownIcon, ChevronUpIcon, FilterIcon } from '../../components/Icons';
import { GroupedTaxonList } from '../../components/TaxonList';
import Spinner from '../../components/Spinner';
import Switch from '../../components/Controls/Switch';
import buildQueryString from '../../utils/buildQueryString';
import parseQueryString from '../../utils/parseQueryString';
import settings from '../../settings';
import { fetchTaxa } from '../../actions';


const propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string
          ]).isRequired
        })
      ).isRequired
    })
  ),
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string
    })
  )
};

const QuickView = ({ filters, groups, history, location, match, taxa, getTaxa }) => {
  let [ groupsIsExpanded, setGroupsIsExpanded ] = useState(false);

  let [ filtersIsExpanded, setFiltersIsExpanded ] = useState(false);

  useEffect(() => {
    setGroupsIsExpanded(false);
  }, [ match.params.group ]);

  const query = parseQueryString(location.search);

  useEffect(() => {
    getTaxa(query);
  }, [ location.search, match.params.group ]);

  const getStateForFilter = (filter, value) => {
    if (query[filter] == null) {
      return false
    }
    return query[filter] === value;
  };

  const getSelectedGroupName = () => {
    const group = groups
      .filter(g => g.value == match.params.group)
      .pop();

    return group.label;
  };

  const getLinkToGroup = (group) => {
    const linkTo = {
      pathname: '/quick-view/',
      search: location.search
    };

    if (group != null) {
      linkTo.pathname = linkTo.pathname + `${group}/`;
    }

    return linkTo;
  };

  const handleChangeFilter = (ev) => {
    const nextQuery = {};

    Object.keys(query).forEach(queryKey => {
      if (queryKey !== ev.target.name) {
        nextQuery[queryKey] = query[queryKey];
      }
    });

    if (ev.target.checked) {
      // TODO: Handle boolean values properly
      nextQuery[ev.target.name] = ev.target.value.toLowerCase() === 'true';
    }

    history.replace({
      search: buildQueryString(nextQuery)
    });
  };

  const handleClickToggleGroups = (_ev) => {
    setGroupsIsExpanded(!groupsIsExpanded);
    setFiltersIsExpanded(false);
  };

  const handleClickToggleFilters = (_ev) => {
    setGroupsIsExpanded(false);
    setFiltersIsExpanded(!filtersIsExpanded);
  };

  return (
    <section className="quick-view">
      <button
        type="button"
        className="quick-view-groups-toggle"
        onClick={handleClickToggleGroups}
        aria-controls="groups-of-organisms"
        aria-expanded={groupsIsExpanded}
      >
      {groupsIsExpanded ? (
        <ChevronUpIcon />
      ) : (
        <ChevronDownIcon />
      )}
      </button>
      <button
        type="button"
        className="quick-view-filters-toggle"
        onClick={handleClickToggleFilters}
        aria-controls="filtering-of-organisms"
        aria-expanded={filtersIsExpanded}
      >
        <FilterIcon />
      </button>
      <div className="quick-view-groups">
        <ul className="quick-view-group-list" id="groups-of-organisms">
        {groups.map(({ label, value }) => (
          <li className="quick-view-group-item">
            <NavLink exact to={getLinkToGroup(value)}>
              {label}
            </NavLink>
          </li>
        ))}
        </ul>
      </div>
      <div className="quick-view-filters" id="filtering-of-organisms">
        <h2 className="quick-view-filters-heading">
          Filters
        </h2>
      {filters.map(({ group, items }) => (
        <fieldset className="quick-view-filter-group">
          <legend className="quick-view-filter-group-name">
            {group}
          </legend>
          <ul className="quick-view-filter-list">
          {items.map(({ label, name, value }) => (
            <li className="quick-view-filter-item">
              <Switch
                checked={getStateForFilter(name, value)}
                labelText={label}
                name={name}
                value={value}
                onChange={handleChangeFilter}
              />
            </li>
          ))}
          </ul>
        </fieldset>
      ))}
      </div>
      <h1 className="quick-view-heading">
        {getSelectedGroupName()}
      </h1>
      <div className="quick-view-results">
        {taxa === null && (
          <div className="quick-view-results-loading">
            <Spinner />
          </div>
        )}
        {taxa && taxa.length > 0 && (
          <GroupedTaxonList data={taxa} />
        )}
      </div>
    </section>
  );
};

QuickView.propTypes = propTypes;


const mapStateToProps = (state) => ({
  filters: settings.ui.quickView.filters,
  groups: settings.ui.quickView.groups,
  taxa: state.taxa
});

const mapDispatchToProps = dispatch => ({
  getTaxa: (query) => dispatch(fetchTaxa(query))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickView);
