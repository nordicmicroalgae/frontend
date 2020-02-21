import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const ConePlusHalfSphere = () => (
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
      {/* ====== Sphere ====== */}
      <Mesh position={[0, -1, 0]}>
        <sphereGeometry
          attach="geometry"
          args={[
            1,             // radius
            32,            // width segments
            32,            // height segments
            0,             // phi start
            Math.PI * 2,   // phi length
            Math.PI * 0.5  // theta start
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);


export default ConePlusHalfSphere;
