import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Navigation from './Navigation';
import Page, { Home } from '../../containers/Page';
import GalleryView from '../../containers/GalleryView';
import HallOfFame from '../../containers/HallOfFame';
import QuickView from '../../containers/QuickView';
import TaxonView from '../../containers/TaxonView';
import settings from '../../settings.json';


const App = () => (
  <Router>
    <Provider store={store}>
      <Navigation items={settings.ui.navigation} />
      <main className="main" role="main">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/gallery/:scope?/:value/" component={GalleryView} exact />
          <Route path="/hall-of-fame/" component={HallOfFame} />
          <Route path="/quick-view/:group?/" component={QuickView} />
          <Route path="/taxon/:slug/" component={TaxonView} />
          <Route path="/:slug?/" component={Page} />
        </Switch>
      </main>
    </Provider>
  </Router>
);

export default App;
