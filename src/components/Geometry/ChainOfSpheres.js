import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';


const ChainOfSpheres = () => (
  <Scene>
    <Group>
      <Mesh position={[-0.25, -1.5, 0]}>
        {/* ====== Sphere 1 ====== */}
        <sphereGeometry
          attach="geometry"
          args={[
            0.5,    // radius
            32,     // width segments
            32      // height segments
          ]}
        />
      </Mesh>
      <Mesh position={[0, 0 ,0]}>
        {/* ====== Sphere 2 ====== */}
        <sphereGeometry
          attach="geometry"
          args={[
            0.5,    // radius
            32,     // width segments
            32      // height segments
          ]}
        />
      </Mesh>
      <Mesh position={[0.5, 1.5, 0]}>
        {/* ====== Sphere 3 ====== */}
        <sphereGeometry
          attach="geometry"
          args={[
            0.5,    // radius
            32,     // width segments
            32      // height segments
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);


export default ChainOfSpheres;
