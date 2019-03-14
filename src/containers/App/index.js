import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import MapInteractive from '../../components/MapInteractive';
import ContactForm from '../../pages/ContactForm';
import Categories from '../../pages/DeviceCategories';
import About from '../../pages/About';
import FAQ from '../../pages/FAQ';
import NotFoundPage from '../NotFoundPage';
import Layout from '../../pages/Layout';
import reducer from './reducer';
import saga from './saga';

export const App = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={(props) => (
        <Layout renderFooter={false} renderHeader={false} PageComponent={MapInteractive} {...props} />
      )}
    />
    <Route path="/contact-owner/:deviceId/" render={(props) => <Layout PageComponent={ContactForm} {...props} />} />
    <Route path="/categories" render={(props) => <Layout PageComponent={Categories} {...props} />} />
    <Route path="/about/faq" render={(props) => <Layout PageComponent={FAQ} {...props} />} />
    <Route path="/about" render={(props) => <Layout PageComponent={About} {...props} />} />
    <Route path="" render={(props) => <Layout PageComponent={NotFoundPage} {...props} />} />
  </Switch>
);

// changed key to global
const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
