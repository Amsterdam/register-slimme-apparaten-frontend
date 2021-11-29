import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

const About = () => (
  <div>
    <h2>Over dit register</h2>

    <NavLink to="/about/faq" className="link-faq">
      Veelgestelde vragen (FAQ)
    </NavLink>
  </div>
);

export default About;
