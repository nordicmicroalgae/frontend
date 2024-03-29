import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import { ChevronDownIcon, ChevronUpIcon, FilterIcon } from 'Components/Icons';
import Picture from 'Components/Media/Picture';
import TaxonList from 'Components/Taxonomy/List';
import Spinner from 'Components/Spinner';
import Switch from 'Components/Controls/Switch';
import buildQueryString from 'Utilities/buildQueryString';
import parseQueryString from 'Utilities/parseQueryString';
import getKey from 'Utilities/getKey';
import settings from '../../settings';
import { useGetAllTaxaQuery, useGetFilteredTaxaQuery } from 'Slices/taxa';

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

const QuickView = ({ filters, groups, history, location, match }) => {
  let [ groupsIsExpanded, setGroupsIsExpanded ] = useState(false);

  let [ filtersIsExpanded, setFiltersIsExpanded ] = useState(false);

  useEffect(() => {
    setGroupsIsExpanded(false);
  }, [ match.params.group ]);

  const query = parseQueryString(location.search);

  query.group = match.params.group
    ? match.params.group
    : 'All';

  const result = useGetAllTaxaQuery();
  const filteredResult = useGetFilteredTaxaQuery(query);

  const isLoading = result.isLoading || filteredResult.isLoading;
  const isSuccess = result.isSuccess && filteredResult.isSuccess;
  
  const taxa = isSuccess
    ? filteredResult.data.map(
        slug => ({
          ...result.data.entities[slug],
          thumbnail: result.data.entities[slug].image
            ? result.data.entities[slug].image.s.url
            : null,
        })
      )
    : [];

  const getStateForFilter = (filter, value) => {
    if (query[filter] == null) {
      return false
    }
    return query[filter] === value;
  };

  const getSelectedGroupName = () => {
    const group = groups.find(
      g => g.value === query.group
    );
    return group ? group.label : 'All';
  };

  const getLinkToGroup = (group) => {
    const linkTo = {
      pathname: '/quick-view/',
      search: location.search
    };

    if (group != null && group !== 'All') {
      linkTo.pathname = linkTo.pathname + `${group}/`;
    }

    return linkTo;
  };

  const getLinkToTaxon = (taxon) => {
    return {
      pathname: `/taxon/${taxon.slug}/`
    };
  };

  const handleChangeFilter = (ev) => {
    const nextQuery = {};

    Object.keys(query).forEach(queryKey => {
      if (queryKey === 'group') {
        return;
      }
      if (queryKey !== ev.target.name) {
        nextQuery[queryKey] = query[queryKey];
      }
    });

    if (ev.target.checked) {
      const field = ev.target.name;
      const value = ev.target.value;
      nextQuery[field] = (
        ['true', 'false'].includes(value.toLowerCase())
          ? value.toLowerCase() === 'true'
          : value
      );
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
          <li className="quick-view-group-item" key={getKey('group', label)}>
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
        <fieldset className="quick-view-filter-group" key={getKey('filter-group', group)}>
          <legend className="quick-view-filter-group-name">
            {group}
          </legend>
          <ul className="quick-view-filter-list">
          {items.map(({ label, name, value }) => (
            <li className="quick-view-filter-item" key={getKey('filter', name, value)}>
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
        {isLoading && (
          <div className="quick-view-results-loading">
            <Spinner />
          </div>
        )}
        {taxa && taxa.length > 0 && (
          <TaxonList
            data={taxa}
            groupBy="scientificName"
            getItemLinkProps={taxon => ({
              to: getLinkToTaxon(taxon)
            })}
            Link={Link}
            Thumbnail={({data}) => (
              <Picture
                src={data.image.s.url}
                backgroundColor="transparent"
                backgroundImage={data.image.p.url}
                width={160}
              />
            )}
          />
        )}
      </div>
    </section>
  );
};

QuickView.propTypes = propTypes;

QuickView.defaultProps = {
  filters: settings.ui.quickView.filters,
  groups: settings.ui.quickView.groups,
};


export default QuickView;
