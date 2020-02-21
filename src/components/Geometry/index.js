import './Geometry.scss';
import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';

export { default as Cylinder } from './Cylinder';
export { default as Sphere } from './Sphere';
export { default as Cone } from './Cone';
export { default as ConePlusHalfSphere } from './ConePlusHalfSphere';
export { default as Trapezoid } from './Trapezoid';
export { default as Parallelepiped } from './Parallelepiped';
export { default as ChainOfSpheres } from './ChainOfSpheres';
export { default as Ellipsoid } from './Ellipsoid';
export { default as TwoCones } from './TwoCones';


export const TwoTruncatedCones = () => (
  <Scene>
    <Group>
      <Mesh position={[0, 1, 0]}>
        {/* ====== Cylinder 1 ====== */}
        <cylinderGeometry
          attach="geometry"
          args={[
            0.4,  // radius top
            1,    // radius bottom
            2,    // height
            32,   // radial segments
            1     // height segments
          ]}
        />
      </Mesh>
      <Mesh position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
        {/* ====== Cylinder 2 ====== */}
        <cylinderGeometry
          attach="geometry"
          args={[
            0.4,  // radius top
            1,    // radius bottom
            2,    // height
            32,   // radial segments
            1     // height segments
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);
