import React from 'react';
import Icon from './Icon';

const FilterIcon = (props) => (
  <Icon { ...props }>
    <path d="M 4 4.5 H 14 L 10 10 V 14 L 8 15.5 V 10 L 4 4.5 Z M 4 3.5 L 14 3.5 V 2.5 H 4 V 3.5 Z" />
  </Icon>
);

export default FilterIcon;
