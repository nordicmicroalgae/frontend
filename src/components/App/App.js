import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';

const App = () => (
  <Router>
    <Navigation />
    <main className="main" role="main">
      Main
    </main>
  </Router>
);

export default App;
