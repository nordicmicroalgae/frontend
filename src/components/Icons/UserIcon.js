import React from 'react';
import Icon from './Icon';

const PlusIcon = (props) => (
  <Icon { ...props }>
    <path d="M1,9a8,8,0,1,1,8,8A8,8,0,0,1,1,9ZM2,9A7,7,0,1,0,9,2,7,7,0,0,0,2,9Zm2,3.334C4,10.953,6.239,10.2,9,10.2s5,.753,5,2.134S11.761,15.36,9,15.36,4,13.715,4,12.334ZM6,6.8a3,3,0,1,1,3,3A3,3,0,0,1,6,6.8Z" />
  </Icon>
);

export default PlusIcon;
