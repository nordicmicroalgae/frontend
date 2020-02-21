import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const TwoCones = () => (
  <Scene>
    <Group>
      <Mesh position={[0, 1, 0]}>
        {/* ====== Cone 1 ====== */}
        <coneGeometry
          attach="geometry"
          args={[
            1,    // radius
            2,    // height
            32    // radial segments
          ]}
        />
      </Mesh>
      <Mesh position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
        {/* ====== Cone 2 ====== */}
        <coneGeometry
          attach="geometry"
          args={[
            1,    // radius
            2,    // height
            32    // radial segments
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);


export default TwoCones;
