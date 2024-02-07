import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'Store';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from 'Containers/Home';
import Page from 'Containers/Page';
import GalleryView from 'Containers/GalleryView';
import HallOfFame from 'Containers/HallOfFame';
import QuickView from 'Containers/QuickView';
import TaxonView from 'Containers/TaxonView';
import settings from '../../settings.json';


const App = () => (
  <Router>
    <Provider store={store}>
      <Navigation items={settings.ui.navigation} />
      <main className="main" role="main">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/latest-images/" component={GalleryView} exact />
          <Route path="/gallery/:scope?/:value/" component={GalleryView} exact />
          <Route path="/hall-of-fame/" component={HallOfFame} />
          <Route path="/quick-view/:group?/" component={QuickView} />
          <Route path="/taxon/:slug/" component={TaxonView} />
          <Route path="/:slug?/" component={Page} />
        </Switch>
      </main>
      <Footer />
    </Provider>
  </Router>
);

export default App;
