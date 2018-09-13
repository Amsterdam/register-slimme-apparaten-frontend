import React from 'react';
import { NavLink } from 'react-router-dom';

import MapThumbnail from '../../../public/images/map-thumbnail.png'; // eslint-disable-line no-unused-vars

import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header-component no-print">
        <NavLink className="header-link" to="/">
          <img className="map-thumbnail" src="/assets/map-thumbnail.png" alt=""></img>
          <span className="header-title">Register slimme apparaten</span>
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
