import React from 'react';
import { NavLink } from 'react-router-dom';
import APP_ROUTES from '../../services/appRoutes';

import './style.scss';

const About = () => (
  <div>
    <h2>Over dit register</h2>

    <NavLink to={APP_ROUTES.ABOUT_FAQ} className="link-faq">
      Veelgestelde vragen (FAQ)
    </NavLink>

    <NavLink to={APP_ROUTES.MIGRATION} className="link-faq">
      Slimme-apparaten wordt Sensorenregister
    </NavLink>
  </div>
);

export default About;
