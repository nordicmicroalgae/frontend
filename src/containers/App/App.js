import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'Store';
import Prefetch from './Prefetch';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from 'Containers/Home';
import Page from 'Containers/Page';
import { NewsArchive } from 'Containers/News';
import GalleryView from 'Containers/GalleryView';
import GalleryCovers from 'Containers/GalleryView/GalleryCovers';
import HallOfFame from 'Containers/HallOfFame';
import QuickView from 'Containers/QuickView';
import TaxonView from 'Containers/TaxonView';
import settings from '../../settings.json';
import ImageLabelingPage from 'Containers/ImageLabeling/ImageLabelingPage';

const App = () => (
  <Router>
    <Provider store={store}>
      <Prefetch />
      <Navigation items={settings.ui.navigation} />
      <main className="main" role="main">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/gallery/all/" component={GalleryView} exact />
          <Route path="/gallery/:scope?/:value/" component={GalleryView} exact />
          <Route path="/gallery/" component={GalleryCovers} exact />
          <Route path="/hall-of-fame/" component={HallOfFame} />
          <Route path="/quick-view/:group?/" component={QuickView} />
          <Route path="/taxon/:slug?/" component={TaxonView} />
          <Route path="/image-labeling/" component={ImageLabelingPage} exact />
          <Route path="/news/" component={NewsArchive} />
          <Route path="/:slug?/" component={Page} />
        </Switch>
      </main>
      <Footer />
    </Provider>
  </Router>
);

export default App;
