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


export const ChainOfSpheres = () => (
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

export const Ellipsoid = () => (
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

export const TwoCones = () => (
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
