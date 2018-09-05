import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import MapInteractive from 'components/MapInteractive';
import ContactForm from 'pages/ContactForm';
import ThingTypes from 'pages/ThingTypes';
import About from 'pages/About';
import NotFoundPage from 'containers/NotFoundPage';
import Footer from 'components/Footer';
import HeaderContainer from 'containers/HeaderContainer';

import reducer from './reducer';
import saga from './saga';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container app-container">
        <div>
          <HeaderContainer />
        </div>
        <div className="content container">
          <Switch>
            <Route exact path="/" component={MapInteractive} />
            <Route path="/contact-owner/:thingId/:locationId" component={ContactForm} />
            <Route path="/types" component={ThingTypes} />
            <Route path="/about" component={About} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </div>
        <div className="container-fluid">
          <Footer />
        </div>
      </div>
    );
  }
}

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// changed key to global
const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  // withConnect,
)(App);
