import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies

import Checkbox from './Checkbox';

storiesOf('Shared/Checkbox', module)
  .add('unchecked', () => (
    <Checkbox
      name="storybook"
      onChange={action('clicked')}
    />
  ))
  .add('checked', () => (
    <Checkbox
      checked
      name="storybook"
      onChange={action('clicked')}
    />
  ));
