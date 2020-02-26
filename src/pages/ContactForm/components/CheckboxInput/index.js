/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Checkbox } from '@datapunt/asc-ui';

export const CheckboxInput = props => {
  const { name, display } = props;
  const render = ({ handler, value }) => (
    <div className="rij antwoord">
      <Checkbox
        type="checkbox"
        name=""
        id={`form${name}`}
        checked={value}
        {...handler()}
        className="kenmerkcheckbox"
      />
      <label htmlFor={`form${name}`}>{display}</label>
    </div>
  );

  render.defaultProps = {
    touched: false,
  };

  render.propTypes = {
    handler: PropTypes.func.isRequired,
    value: PropTypes.bool,
    touched: PropTypes.bool,
  };
  return render;
};

export default CheckboxInput;
