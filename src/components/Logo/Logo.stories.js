import React from 'react';
import Logo from './';

export default { title: 'Logo' };

export const size16 = () => (
  <Logo size={16} />
);

export const size32 = () => (
  <Logo size={32} />
);

export const size64 = () => (
  <Logo size={64} />
);

export const size128 = () => (
  <Logo size={128} />
);

export const lightTheme = () => (
  <div style={{width: '128px', padding: '2rem', background: '#000', textAlign: 'center'}}>
    <Logo size={128} theme="light" />
  </div>
);
