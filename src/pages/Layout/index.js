import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../../containers/HeaderContainer';
import Footer from '../../components/Footer';

/**
 * Component that will render the page structure and, with or without header/footer
 */
const Layout = ({ PageComponent, renderHeader, renderFooter, ...rest }) => (
  <div className="container app-container">
    {renderHeader && <HeaderContainer />}

    <div className="content container-fluid">
      <div className="row">
        <main className="col-12 col-sm-10 offset-sm-1 col-md-8">
          <PageComponent {...rest} />
        </main>
      </div>
    </div>

    {renderFooter && <Footer />}
  </div>
);

Layout.defaultProps = {
  renderFooter: true,
  renderHeader: true,
};

Layout.propTypes = {
  /** Page component that needs to be rendered on route match */
  PageComponent: PropTypes.func.isRequired,
  /** When false, will not render page footer */
  renderFooter: PropTypes.bool,
  /** When false, will not render page header */
  renderHeader: PropTypes.bool,
};

export default Layout;
