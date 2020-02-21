import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const Cylinder = () => (
  <Scene>
    <Group>
      {/* ====== Cone ====== */}
      <Mesh>
        <cylinderGeometry
          attach="geometry"
          args={[
            1,    // radius top
            1,    // radius bottom
            2.5,  // height
            32    // radial segments
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);


export default Cylinder;
