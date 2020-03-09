import React from 'react';
import Icon from './Icon';

const PlusIcon = (props) => (
  <Icon { ...props }>
    <path d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 L 11 2 Z" />
  </Icon>
);

export default PlusIcon;
