import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Navigation from './Navigation';
import Page from '../../containers/Page';
import QuickView from '../../containers/QuickView';
import settings from '../../settings.json';


const App = () => (
  <Router>
    <Provider store={store}>
      <Navigation items={settings.ui.navigation} />
      <main className="main" role="main">
        <Switch>
          <Route path="/quick-view/:group?/" component={QuickView} />
          <Route path="/:slug?/" component={Page} />
        </Switch>
      </main>
    </Provider>
  </Router>
);

export default App;
