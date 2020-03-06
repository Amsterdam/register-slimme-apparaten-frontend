import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { withAppContext } from 'test/utils';

import MapLegend , {Props} from '.';

describe('MapLegend', () => {
  const props:Props = {
    onToggleCategory: jest.fn(),
  };
  it('should render', () => {
    const { queryByText, getByTestId, queryByTitle } = render(
      withAppContext(<MapLegend {...props} />)
    );

    expect(queryByTitle('Kaartlagen verbergen')).toBeInTheDocument();
    expect(queryByText('Camera toezichtsgebied')).toBeInTheDocument();
    expect(queryByText('Camera')).toBeInTheDocument();
    expect(queryByText('Sensor')).toBeInTheDocument();
    expect(queryByText('Beacons')).toBeInTheDocument();
    expect(queryByText('Slimme verkeersinformatie')).toBeInTheDocument();


    fireEvent.click(getByTestId('mapLegendToggleButton'));

    expect(queryByTitle('Kaartlagen tonen')).toBeInTheDocument();
    expect(queryByText('Camera toezichtsgebied')).not.toBeInTheDocument();
    expect(queryByText('Camera')).not.toBeInTheDocument();
    expect(queryByText('Sensor')).not.toBeInTheDocument();
    expect(queryByText('Beacons')).not.toBeInTheDocument();
    expect(queryByText('Slimme verkeersinformatie')).not.toBeInTheDocument();
  });
});
