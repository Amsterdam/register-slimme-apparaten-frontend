import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../../public/images/map-thumbnail.png';
import './style.scss';

const Header = () => (
  <div className="header-component no-print">
    <NavLink className="header-link" to="/">
      <img className="map-thumbnail" src={process.env.CITY_HEADER_THUMBNAIL} alt="" />
      <span className="header-title">{process.env.CITY_NAME}</span>
    </NavLink>
  </div>
);

export default Header;
