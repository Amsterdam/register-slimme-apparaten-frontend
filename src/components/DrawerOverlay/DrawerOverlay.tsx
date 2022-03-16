import React, { CSSProperties, FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { Button, Icon, styles, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import { ChevronRight } from '@amsterdam/asc-assets';
import { LegendControlProps } from '../../components/LegendControl/LegendControl';
import { DeviceMode, useDeviceMode } from '../../utils/useDeviceMode';

const HANDLE_SIZE_MOBILE = 70;
const CONTROLS_PADDING = 32;

export enum DrawerState {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Preview = 'PREVIEW',
}

export const isMobile = (mode: DeviceMode): mode is DeviceMode.Mobile => mode === DeviceMode.Mobile;
export const isDesktop = (mode: DeviceMode): mode is DeviceMode.Desktop => mode === DeviceMode.Desktop;

interface ModeProp {
  // prefixing mode with $ to prevent prop bleeding through to the DOM
  $mode: DeviceMode;
}

const MapOverlay = styled('div')`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 50px;
  z-index: 400;
  pointer-events: none;
  @media print {
    position: relative;
  }
`;

const DrawerMapOverlay = styled(MapOverlay)`
  flex-direction: column;
`;

const DrawerHandleMobile = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: ${HANDLE_SIZE_MOBILE}px;
  padding-bottom: ${themeSpacing(5)};
  &::before {
    content: '';
    display: block;
    width: 200px;
    height: 4px;
    border-radius: 3px;
    background-color: ${themeColor('tint', 'level4')};
  }
`;

const DrawerHandleMiniDesktop = styled.div`
  width: 20px;
  height: 44px;
  background-color: ${themeColor('tint', 'level1')};
  top: 16px;
  position: absolute;
  right: -20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: content-box;
  border-left: none;
  transition: background-color 0.1s ease-in-out;
  &:before {
    content: '';
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
`;

const DrawerHandleDesktop = styled(Button)`
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  width: 0;
  height: 100%;
  position: relative;
  margin-right: ${themeSpacing(5)};
  @media print {
    display: none;
  }
  & > ${styles.IconStyle} {
    opacity: 0;
  }
  &:hover {
    & > ${styles.IconStyle} {
      opacity: 1;
    }
    ${DrawerHandleMiniDesktop} {
      background-color: ${themeColor('tint', 'level3')};
    }
  }
`;

const HandleIcon = styled(ChevronRight)<{ $isOpen: boolean }>`
  transition: transform 0.25s ease-in-out;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

const DrawerContainer = styled.div<{ animate: boolean } & ModeProp>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0; /* The top value will be overwritten with the size of the locked controls */
  bottom: 0;
  right: 0;
  left: 0;
  will-change: transform;
  @media print {
    position: relative;
    width: 100%;
  }
  ${({ $mode }) =>
    isDesktop($mode) &&
    css`
      right: initial;
      left: initial;
      flex-direction: row-reverse;
    `}
  ${({ animate }) =>
    animate &&
    css`
      transition: transform 0.25s ease-in-out;
    `}
`;

const Drawer = styled.div<ModeProp>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  pointer-events: all;
  ${({ $mode }) =>
    isDesktop($mode) &&
    css`
      flex-direction: row-reverse;
    `}
`;

const DrawerContent = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 0;
  position: relative;
  background-color: ${themeColor('tint', 'level1')};
`;

const ControlsContainer = styled.div<ModeProp>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${themeSpacing(4)};
  @media print {
    display: none;
  }
`;

interface DrawerOverlayProps {
  state?: DrawerState;
  Controls: React.ComponentType<LegendControlProps>;
  onStateChange?: (state: DrawerState) => void;
  onControlClick: () => void;
}

const DrawerOverlay: FunctionComponent<DrawerOverlayProps> = ({
  children,
  onStateChange,
  Controls,
  state = DrawerState.Closed,
  onControlClick,
}) => {
  const mode = useDeviceMode();
  const DrawerHandle = isMobile(mode) ? DrawerHandleMobile : DrawerHandleDesktop;

  function getDrawerPositionTransform(drawerState = state) {
    if (drawerState !== DrawerState.Open && !isMobile(mode)) {
      return `translateX(calc(-100% + 178px + 292px))`;
    }

    if (drawerState !== DrawerState.Open && isMobile(mode)) {
      return `translateY(calc(100% - 130px))`;
    }

    return '';
  }

  const drawerContainerStyle: CSSProperties = {};
  const drawerContentStyle: CSSProperties = {};

  drawerContainerStyle.transform = getDrawerPositionTransform();

  const drawerClick = () => {
    if (!onStateChange) {
      return;
    }

    onStateChange(state === DrawerState.Closed ? DrawerState.Open : DrawerState.Closed);
  };

  return (
    <DrawerMapOverlay>
      <DrawerContainer $mode={mode} style={drawerContainerStyle} animate={true}>
        <ControlsContainer $mode={mode}>
          <Controls
            showDesktopVariant
            onClick={() => {
              if (!onStateChange) {
                return;
              }

              onStateChange(DrawerState.Open);
              onControlClick();
            }}
          />
        </ControlsContainer>
        <Drawer $mode={mode}>
          <DrawerHandle type="button" variant="blank" size={CONTROLS_PADDING} title="Open paneel" onClick={drawerClick}>
            {isDesktop(mode) ? (
              <DrawerHandleMiniDesktop>
                <Icon size={20}>
                  <HandleIcon $isOpen={state === DrawerState.Open} />
                </Icon>
              </DrawerHandleMiniDesktop>
            ) : null}
          </DrawerHandle>

          <DrawerContent style={drawerContentStyle} data-testid="drawerContent">
            {children}
          </DrawerContent>
        </Drawer>
      </DrawerContainer>
    </DrawerMapOverlay>
  );
};

export default DrawerOverlay;
