import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const Ellipsoid = () => (
  <Scene>
    <Group>
      <Mesh scale={[1, 0.5, 1]}>
        {/* ====== Sphere ====== */}
        <sphereGeometry
          attach="geometry"
          args={[
            1,    // radius
            32,   // width segments
            32    // height segments
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);


export default Ellipsoid;
