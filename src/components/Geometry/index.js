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



export const Cylinder = () => (
  <Scene>
    <mesh position={[0, 0, 0]} >
      <cylinderGeometry attach="geometry" args={[1, 1, 2.5, 32]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  </Scene>
);

export const Sphere = () => (
  <Scene>
    <mesh position={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  </Scene>
);

export const Cone = () => (
  <Scene>
    <mesh position={[0, 0, 0]}>
      <coneGeometry attach="geometry" args={[1, 2, 32]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  </Scene>
);

export const ConePlusHalfSphere = () => (
  <Scene>
    <mesh position={[0, 0, 0]}>
      <coneGeometry attach="geometry" args={[1, 2, 32]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
    <mesh position={[0, -1, 0]}>
      <sphereGeometry attach="geometry" args={[1, 32, 32, 0, Math.PI * 2, Math.PI * 0.5]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  </Scene>
);

export const Trapezoid = () => {
  return(
    <Scene>
      <mesh position={[0, 0, 0]} scale={[2, 1.5, 2]}>
        <cylinderGeometry attach="geometry" args={[0.8 / Math.sqrt(2), 1 / Math.sqrt(2), 1, 4, 1]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
    </Scene>
  );
};
