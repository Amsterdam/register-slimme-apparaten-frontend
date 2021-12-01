import React, { FunctionComponent } from 'react';
import { MapLayers } from '@amsterdam/asc-assets';
import { Button } from '@amsterdam/asc-ui';
import styled from 'styled-components';

export interface LegendControlProps {
  showDesktopVariant: boolean;
  onClick: () => void;
}

const StyledButton = styled(Button)`
  min-width: inherit;
`;

const Control = styled.div`
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.1);
  pointer-events: all;
`;

const StyledControl = styled(Control)`
  align-self: flex-start;
`;

const LegendControl: FunctionComponent<LegendControlProps> = ({ showDesktopVariant = true, onClick }) => {
  const iconProps = showDesktopVariant
    ? { iconLeft: <MapLayers data-testid="desktopIcon" /> }
    : { icon: <MapLayers data-testid="mobileIcon" />, size: 32 };

  return (
    <StyledControl data-testid="legendControl">
      <StyledButton
        type="button"
        variant="blank"
        title="Legenda"
        data-testid="legenda"
        iconSize={20}
        onClick={() => {
          onClick();
        }}
        {...iconProps}
      >
        Legenda
      </StyledButton>
    </StyledControl>
  );
};

export default LegendControl;
