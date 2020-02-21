import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


export const Trapezoid = () => (
  <Scene>
    <Group>
      {/* ====== Cylinder ====== */}
      <Mesh scale={[2, 1.5, 2]}>
        <cylinderGeometry
          attach="geometry"
          args={[
            0.8 / Math.sqrt(2), // radius top
            1 / Math.sqrt(2),   // radius bottom
            1,                  // height
            4,                  // radial segments
            1                   // height segments
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);


export default Trapezoid;
