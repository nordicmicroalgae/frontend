import React from 'react';

const FilterSection = ({ heading, items, selected, onToggle, formatName }) => (
  <div className="filter-section">
    <h4 className="filter-section-heading">{heading}</h4>
    <ul className="filter-list">
      {items.map((item) => (
        <li key={item.name} className="filter-item">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={selected.includes(item.name)}
              onChange={() => onToggle(item.name)}
              className="filter-checkbox"
            />
            <span>
              {formatName ? formatName(item.name) : item.name} ({item.count})
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default FilterSection;
