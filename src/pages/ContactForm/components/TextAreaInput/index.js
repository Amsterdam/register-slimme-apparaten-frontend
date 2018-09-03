import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const TextAreaInput = (props) => {
  const { name, display, placeholder, rows } = props;
  const render = ({ handler, value, invalid, getError, hasError }) => (
    <div className="text-area-input">
      <div className={`rij mode_input text rij_verplicht ${invalid ? 'row_ongeldig' : ''}`}>
        <div className="label">
          <label htmlFor={`form${name}`}>{display}</label>
        </div>

        <div className="input-help">
          {
            (hasError('maxLength') && `Maximaal ${getError('maxLength').requiredLength} tekens`)
          }
          <span className="text-area-input__counter">{ props.maxLength && `${value.length}/${props.maxLength} tekens`}</span>
        </div>

        <div className="text-area-input__control invoer">
          <textarea
            name=""
            id={`form${name}`}
            value=""
            {...handler()}
            placeholder={placeholder}
            rows={rows}
          />
        </div>
      </div>
    </div>
  );

  render.defaultProps = {
    touched: false,
    placeholder: '',
    rows: 4
  };

  render.propTypes = {
    handler: PropTypes.func.isRequired,
    value: PropTypes.string,
    invalid: PropTypes.bool,
    getError: PropTypes.func,
    hasError: PropTypes.func,
    maxLength: PropTypes.number
  };
  return render;
};

export default TextAreaInput;
