import React from 'react'
import { Map, TileLayer } from '@datapunt/react-maps'
import styled from '@datapunt/asc-core'
import { ViewerContainer } from '@datapunt/asc-ui'
// import Controls from '../../../src/components/Zoom'
import { constants, components  } from '@datapunt/amsterdam-react-maps'

const StyledMap = styled(Map)`
  width: 100%;
  height: 100vh;
`

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const MapLayers = () => (
  <StyledMap options={constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS}>
    <StyledViewerContainer
      bottomRight={<components.Zoom />}
    />
    <TileLayer
      args={[constants.DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate]}
      options={{
        subdomains: ['1', '2', '3', '4'],
        tms: true,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }}
    />
  </StyledMap>
)

export default MapLayers
