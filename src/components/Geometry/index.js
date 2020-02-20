import React, { useRef } from 'react';
import { extend, Canvas, useUpdate, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


extend({ OrbitControls });

const Controls = () => {

  const orbit = useRef();
  const { camera, gl } = useThree();

  useUpdate(() => orbit.current.obj.update());

  return (
    <orbitControls
      ref={orbit}
      args={[camera, gl.domElement]}
      enableDamping={true}
      dampingFactor={0.25}
      enablePan={false}
      enableZoom={false}
    />
  )
};


const Scene = ({ children }) => {
  return (
    <div style={{maxWidth: '400px', height: '400px'}}>
      <Canvas>
        <Controls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {children}
      </Canvas>
    </div>
  );
}

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
  color: 'green',
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
