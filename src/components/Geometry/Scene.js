import React, { useState, useRef } from 'react';
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


extend({ OrbitControls });

const Controls = ({ autoRotate, controlsRef }) => {

  const { camera, gl } = useThree();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <orbitControls
      ref={controlsRef}
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

  const controlsRef = useRef();

  const containerRef = useRef();

  let [ autoRotate, setAutoRotate ] = useState(autoPlay);

  const handleClickPlayOrPause = (_ev) => {
    setAutoRotate(!autoRotate);
  };

  const handleClickReset = (_ev) => {
    controlsRef.current.reset();
  };

  const handleClickFullscreen = (_ev) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div className="geometry" ref={containerRef}>
      <Canvas>
        <Controls
          autoRotate={autoRotate}
          controlsRef={controlsRef}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {children}
      </Canvas>
      <div className="geometry-actions">
        <button
          type="button"
          onClick={handleClickReset}
        >
          <RewindIcon />
        </button>
        <button
          type="button"
          onClick={handleClickPlayOrPause}
        >
          {autoRotate ? (
            <PauseIcon />
          ): (
            <PlayIcon />
          )}
        </button>
        <button
          type="button"
          onClick={handleClickFullscreen}
        >
          <FullscreenIcon />
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

const RewindIcon = () => (
  <svg viewBox="0 0 14 12" width="14" height="12">
    <path d="M 0 6 L 7 0 L 7 12 L 0 6 Z" fill="#333" />
    <path d="M 7 6 L 14 0 L 14 12 L 7 6 Z" fill="#333" />
  </svg>
);

const FullscreenIcon = () => (
  <svg viewBox="0 0 14 12" width="14" height="12">
    <path d="M 3 0 L 0 0 L 0 3" fill="none" strokeWidth="4" stroke="#333" strokeLinejoin="miter" strokeMiterlimit="3" strokeLinecap="square" />
    <path d="M 0 9 L 0 12 L 3 12" fill="none" strokeWidth="4" stroke="#333" strokeLinejoin="miter" strokeMiterlimit="3" strokeLinecap="square" />
    <path d="M 14 9 L 14 12 L 11 12" fill="none" strokeWidth="4" stroke="#333" strokeLinejoin="miter" strokeMiterlimit="3" strokeLinecap="square" />
    <path d="M 11 0 L 14 0 L 14 3" fill="none" strokeWidth="4" stroke="#333" strokeLinejoin="miter" strokeMiterlimit="3" strokeLinecap="square" />
  </svg>
);


export default Scene;
