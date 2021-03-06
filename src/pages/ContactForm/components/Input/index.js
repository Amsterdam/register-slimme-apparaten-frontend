import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Label as FieldLabel,
  styles,
  themeColor,
  Typography,
  themeSpacing,
} from '@amsterdam/asc-ui';

const StyledInput = styled.input`
  ${styles.InputStyle.componentStyle.rules}

  &[disabled] {
    border: 1px solid ${themeColor('tint', 'level4')};
    color: ${themeColor('tint', 'level4')};
  }

  ${({ showError }) => showError && css`
    & {
      border: 2px solid ${themeColor('secondary')};
    }
  `}
`;

const Hint = styled(Typography).attrs({
  $as: 'span',
})`
  color: ${themeColor('tint', 'level5')};
  display: block;
  margin-bottom: ${themeSpacing(2)};
  font-size: 16px;
  line-height: 22px;
`;

const Error = styled(Typography).attrs({
  $as: 'h6',
})`
  color: ${themeColor('secondary')};
  font-family: Avenir Next LT W01 Demi, arial, sans-serif;
  font-weight: normal;
  margin: ${themeSpacing(2)} 0;
`;

export const Label = styled(FieldLabel)`
  display: block;
  font-family: Avenir Next LT W01 Demi, arial, sans-serif;
  ${({ hasHint }) =>
    !hasHint &&
    css`
      margin-bottom: ${themeSpacing(2)};
    `}
`;

const Wrapper = styled.div`
  ${({ showError }) => showError && css`
    border-left: 2px solid ${themeColor('secondary')};
    padding-left: ${themeSpacing(4)};
  `}
`;

const Input = ({ className, hint, label, id, error, ...rest }) => (
  <Wrapper className={className} showError={Boolean(error)}>
    {label && <Label hasHint={Boolean(hint)} htmlFor={id} label={label} />}
    {hint && <Hint>{hint}</Hint>}
    {error && <Error>{error}</Error>}
    <StyledInput id={id} showError={Boolean(error)} type="text" {...rest} />
  </Wrapper>
);

Input.defaultProps = {
  className: '',
  error: '',
  hint: '',
  id: '',
  label: '',
};

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};

export default Input;
