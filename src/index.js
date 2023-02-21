import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'Containers/App';
import 'Styles/foundation.scss';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
