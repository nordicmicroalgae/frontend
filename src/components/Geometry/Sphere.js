import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const Sphere = () => (
  <Scene>
    <Group>
      {/* ====== Sphere ====== */}
      <Mesh>
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


export default Sphere;
