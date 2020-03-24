import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, DashIcon, FilterIcon, PlusIcon, SearchIcon } from './';

export default { title: 'Icons' };

const IconBox = ({ title, children }) => (
  <div
    style={{
      margin: '1em',
      display: 'inline-block',
      width: '85px',
      height: '60px',
      textAlign: 'center',
      overflow: 'hidden'
    }}
  >
    {children}
    <p
      style={{
        fontSize: '12px',
        overflow: 'hidden',
        overflowWrap: 'break-word',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {title}
    </p>
  </div>
);

export const basic = () => (
  <>
    <IconBox title="Chevron down">
      <ChevronDownIcon />
    </IconBox>
    <IconBox title="Chevron up">
      <ChevronUpIcon />
    </IconBox>
    <IconBox title="Dash">
      <DashIcon />
    </IconBox>
    <IconBox title="Filter">
      <FilterIcon />
    </IconBox>
    <IconBox title="Plus">
      <PlusIcon />
    </IconBox>
    <IconBox title="Search">
      <SearchIcon />
    </IconBox>
  </>
);
