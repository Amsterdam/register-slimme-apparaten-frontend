import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header-component no-print">
        <NavLink className="header-title" to="/">
          <strong>iot</strong> register
        </NavLink>
      </div>
    );
  }
}

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
