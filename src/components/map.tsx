import * as React from 'react'
import styled from 'styled-components'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

export const Map = ({ position }: { position: any }) => {
  console.log(position)
  return (
    <StyledMap className="relative">
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        key={position}
        style={{
          height: '350px',
          width: '450px',
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={{ lat: position.latitude, lng: position.longitude }} />
      </MapContainer>
    </StyledMap>
  )
}

const StyledMap = styled.div``

const LocationMarker = ({ position }: { position: any }) => {
  const map = useMapEvents({
    locationfound() {
      map.flyTo(position, map.getZoom())
    },
  })

  React.useEffect(() => {
    map.locate()
  }, [position, map])

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
