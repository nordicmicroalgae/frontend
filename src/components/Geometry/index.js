import React, { useState, useRef } from 'react';
import { extend, Canvas, useFrame, useUpdate, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


extend({ OrbitControls });

const Controls = ({ autoRotate }) => {

  const orbit = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    if (orbit.current) {
      orbit.current.update();
    }
  });

  return (
    <orbitControls
      ref={orbit}
      args={[camera, gl.domElement]}
      autoRotate={autoRotate}
      autoRotateSpeed={5.0}
      enableDamping={true}
      dampingFactor={0.25}
      enablePan={false}
      enableZoom={false}
    />
  )
};

const Scene = ({ autoPlay, children }) => {
  let [ animate, setAnimate ] = useState(autoPlay);

  const toggleAnimate = (_ev) => {
    setAnimate(!animate);
  };

  return (
    <div style={{maxWidth: '400px', height: '400px'}}>
      <Canvas>
        <Controls autoRotate={animate} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {children}
      </Canvas>
      <div className="geometry-actions">
        <button type="button" onClick={toggleAnimate}>
          {animate ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
};

Scene.defaultProps = {
  autoPlay: false
};

const PlayIcon = () => (
  <svg viewBox="0 0 9 12" width="9" height="12">
    <path d="M 0 12 L 0 0 L 9 6 L 0 12 Z" fill="#333" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 9 12" width="9" height="12">
    <path d="M 0 0 L 3 0 L 3 12 L 0 12 L 0 0 Z" fill="#333" />
    <path d="M 6 0 L 9 0 L 9 12 L 6 12 L 6 0 Z" fill="#333" />
  </svg>
);

const Group = (props) => {
  return (
    <group {...props}>
      {props.children}
    </group>
  );
}

const Mesh = (props) => (
  <mesh { ...props }>
    {props.children}
    <meshStandardMaterial attach="material" color={props.color} />
  </mesh>
);

Mesh.defaultProps = {
  color: 'royalblue',
  position: [0, 0, 0],
  scale: [1, 1, 1]
};


export const Cylinder = () => (
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

export const Sphere = () => (
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

export const Cone = () => (
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

export const ConePlusHalfSphere = () => (
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

export const Trapezoid = () => {
  return(
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
};

export const Parallelepiped = () => (
  <Scene>
    <Group>
      <Mesh position={[-0.25, 0, 0]} rotation={[0.25, 0.25, Math.PI * 1.5]}>
        <cubeGeometry
          attach="geometry"
          args={[
            1.5,
            1.5,
            1.5,
          ]}
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
