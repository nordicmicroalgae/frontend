import './Geometry.scss';
import React from 'react';
import Group from './Group';
import Scene from './Scene';
import Mesh from './Mesh';

export { default as Cylinder } from './Cylinder';
export { default as Sphere } from './Sphere';
export { default as Cone } from './Cone';
export { default as ConePlusHalfSphere } from './ConePlusHalfSphere';

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

export const Parallelepiped = () => (
  <Scene>
    <Group>
      <Mesh position={[-0.25, 0, 0]} rotation={[0.25, 0.25, Math.PI * 1.5]}>
        {/* ====== Cube ====== */}
        <cubeGeometry
          attach="geometry"
          vertices={[
            {x: 0.75, y: 0.75, z: 0.75},
            {x: 0.75, y: 0.75, z: -0.75},
            {x: 0.75,y: -0.75, z: 0.75},
            {x: 0.75, y: -0.75, z: -0.75},
            {x: -0.75, y: 1.5,z: -0.75},
            {x: -0.75, y: 1.5, z: 0.75},
            {x: -0.75, y:  0, z: -0.75},
            {x: -0.75, y: 0, z: 0.75}
          ]}
        />
      </Mesh>
    </Group>
  </Scene>
);

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
