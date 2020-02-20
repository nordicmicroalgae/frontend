import React from 'react';
import { ChainOfSpheres, Cylinder, Ellipsoid, Sphere, Cone, ConePlusHalfSphere, Trapezoid, Parallelepiped } from './';

export default { title: 'Geometry' };

export const chainOfSpheres = () => (
  <ChainOfSpheres />
);

export const cylinder = () => (
  <Cylinder />
);

export const ellipsoid = () => (
  <Ellipsoid />
);

export const sphere = () => (
  <Sphere />
);

export const cone = () => (
  <Cone />
);

export const conePlusHalfSphere = () => (
  <ConePlusHalfSphere />
);

export const trapezoid = () => (
  <Trapezoid />
);

export const parallelepiped = () => (
  <Parallelepiped />
);
