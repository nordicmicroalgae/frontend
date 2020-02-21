import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const Cone = () => (
  <Scene>
    <Group>
      {/* ====== Cone ====== */}
      <Mesh>
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


export default Cone;
