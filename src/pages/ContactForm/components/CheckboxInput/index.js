/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export const CheckboxInput = (props) => {
  const { name, display, value } = props;
  const render = ({ handler }) => (
    <div className="rij antwoord">
      <input type="checkbox" name="" id={`form${name}`} value={value} {...handler()} className="kenmerkcheckbox" />
      <label htmlFor={`form${name}`}>{display}</label>
    </div>
  );

  render.defaultProps = {
    touched: false,
    value: false
  };

  render.propTypes = {
    handler: PropTypes.func.isRequired,
  };
  return render;
};

export default CheckboxInput;

