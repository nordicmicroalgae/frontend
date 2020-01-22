import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import PageContainer from '../../containers/PageContainer';

const App = () => (
  <Router>
    <Navigation />
    <main className="main" role="main">
      <Switch>
        <Route path="/:page?/" component={PageContainer} />
      </Switch>
    </main>
  </Router>
);

export default App;
