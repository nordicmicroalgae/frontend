import React from 'react';


const Mesh = (props) => (
  <mesh { ...props }>
    {props.children}
    <meshStandardMaterial attach="material" color={props.color} />
  </mesh>
);

Mesh.defaultProps = {
  color: 'royalblue',
  position: [0, 0, 0],
  scale: [1, 1, 1]
};


export default Mesh;
