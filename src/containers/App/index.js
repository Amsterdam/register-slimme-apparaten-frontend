import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import APP_ROUTES from 'services/appRoutes';
import ContactForm from 'pages/ContactForm';
import MapPage from 'pages/MapPage';
import Categories from 'pages/DeviceCategories';
import About from 'pages/About';
import FAQ from 'pages/FAQ';
import NotFoundPage from 'containers/NotFoundPage';

import reducer from './reducer';
import saga from './saga';
import withContainer from '../../pages/withContainer';

export const App = () => (
  <Fragment>
    <Switch>
      <Route exact path="/" component={MapPage} />
      <Route path={APP_ROUTES.CONTACT} component={withContainer(ContactForm)} />
      <Route path={APP_ROUTES.CATEGORIES} component={withContainer(Categories)} />
      <Route path={APP_ROUTES.ABOUT_FAQ} component={withContainer(FAQ)} />
      <Route path={APP_ROUTES.ABOUT} component={withContainer(About)} />
      <Route path="" component={withContainer(NotFoundPage)} />
    </Switch>
  </Fragment>
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(withReducer, withSaga)(App);
