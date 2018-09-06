import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const TextAreaInput = (props) => {
  const { name, display, placeholder, rows } = props;
  const render = ({ handler, touched, submitted, value, invalid, getError, hasError }) => (
    <div className="text-area-input">
      <div className={`rij mode_input text rij_verplicht ${invalid ? 'row_ongeldig' : ''}`}>
        <div className="label">
          <label htmlFor={`form${name}`}>{display}</label>
        </div>

        { (touched || submitted || props.maxLength) &&
          <div className="input-help">
            { (touched || submitted) &&
              (hasError('maxLength') && `Maximaal ${getError('maxLength').requiredLength} tekens`)
            }
            { props.maxLength &&
              <span className="text-area-input__counter">
                {`${value ? value.length : '0'}/${props.maxLength} tekens` }
              </span>
            }
          </div>
        }

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
    placeholder: '',
    rows: 4
  };

  render.propTypes = {
    handler: PropTypes.func.isRequired,
    value: PropTypes.string,
    touched: PropTypes.bool,
    submitted: PropTypes.bool,
    invalid: PropTypes.bool,
    getError: PropTypes.func,
    hasError: PropTypes.func,
    maxLength: PropTypes.number
  };
  return render;
};

export default TextAreaInput;
