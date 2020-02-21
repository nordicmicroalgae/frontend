import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const Parallelepiped = () => (
  <Scene>
    <Group>
      <Mesh position={[-0.25, 0, 0]} rotation={[0.25, 0.25, Math.PI * 1.5]}>
        {/* ====== Cube ====== */}
        <cubeGeometry
          attach="geometry"
          vertices={[
            {x: 0.75, y: 0.75, z: 0.75},
            {x: 0.75, y: 0.75, z: -0.75},
            {x: 0.75,y: -0.75, z: 0.75},
            {x: 0.75, y: -0.75, z: -0.75},
            {x: -0.75, y: 1.5,z: -0.75},
            {x: -0.75, y: 1.5, z: 0.75},
            {x: -0.75, y:  0, z: -0.75},
            {x: -0.75, y: 0, z: 0.75}
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);


export default Parallelepiped;
