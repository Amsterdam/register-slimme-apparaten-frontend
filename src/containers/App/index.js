import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Home from 'pages/Home';
import NotFoundPage from 'containers/NotFoundPage';
import Footer from 'components/Footer';
import HeaderContainer from 'containers/HeaderContainer';

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
                <Route exact path="/" component={Home} />
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

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// changed key to global
const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  // withConnect,
)(App);
