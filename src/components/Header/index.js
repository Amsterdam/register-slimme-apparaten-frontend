import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../../public/images/map-thumbnail.png';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header-component no-print">
        <NavLink className="header-link" to="/">
          <img className="map-thumbnail" src="/assets/map-thumbnail.png" alt="" />
          <span className="header-title">{process.env.CITY_NAME}</span>
        </NavLink>
      </div>
    );
  }

}

export default Header;
