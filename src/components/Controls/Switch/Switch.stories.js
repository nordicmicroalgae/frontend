import React from 'react';
import Switch from './';

export default { title: 'Controls/Switch' };

export const basic = () => (
  <Switch />
);

export const withLabel = () => (
  <Switch labelText="On/Off" />
);

export const toggledOffAndDisabled = () => (
  <Switch disabled labelText="On/Off" />
);

export const toggledOnAndDisabled = () => (
  <Switch checked disabled labelText="On/Off" />
);

export const withLightTheme = () => (
  <Switch checked labelText="On/Off" theme="light" />
);

export const disabledWithLightTheme = () => (
  <Switch checked disabled labelText="On/Off" theme="light" />
);
