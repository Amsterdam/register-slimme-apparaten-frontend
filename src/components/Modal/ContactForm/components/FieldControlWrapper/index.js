import React from 'react';
import PropTypes from 'prop-types';

import { FieldControl } from 'react-reactive-form';

const FieldControlWrapper = ({ control, render, ...props }) => (
  <FieldControl control={control} render={render(props)} />
);

FieldControlWrapper.propTypes = {
  control: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

export default FieldControlWrapper;
