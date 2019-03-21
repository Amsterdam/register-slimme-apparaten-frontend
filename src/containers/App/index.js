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
import Footer from '../../components/Footer';
import HeaderContainer from '../../containers/HeaderContainer';
import reducer from './reducer';
import saga from './saga';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container app-container">
        <HeaderContainer />
        <div className="content container-fluid">
          <div className="row">
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8">
              <Switch>
                <Route exact path="/" component={MapInteractive} />
                <Route path="/contact-owner/:deviceId/" component={ContactForm} />
                <Route path="/categories" component={Categories} />
                <Route path="/about/faq" component={FAQ} />
                <Route path="/about" component={About} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// changed key to global
const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
