import React from 'react';


const Group = (props) => {
  return (
    <group {...props}>
      {props.children}
    </group>
  );
};

export default Group;
