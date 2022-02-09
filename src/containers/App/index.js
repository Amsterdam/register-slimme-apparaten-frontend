import React from 'react';
import { Switch, Route } from 'react-router-dom';

import APP_ROUTES from '../../services/appRoutes';
import MapPage from '../../pages/MapPage';
import Categories from '../../pages/DeviceCategories';
import About from '../../pages/About';
import FAQ from '../../pages/FAQ';
import Migration from '../../pages/Migration';
import NotFoundPage from '../NotFoundPage';

import withContainer from '../../pages/withContainer';

export const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={MapPage} />
      <Route path={APP_ROUTES.CATEGORIES} component={withContainer(Categories)} />
      <Route path={APP_ROUTES.ABOUT_FAQ} component={withContainer(FAQ)} />
      <Route path={APP_ROUTES.ABOUT} component={withContainer(About)} />
      <Route path={APP_ROUTES.MIGRATION} component={withContainer(Migration)} />
      <Route path="" component={withContainer(NotFoundPage)} />
    </Switch>
  </>
);

export default App;
