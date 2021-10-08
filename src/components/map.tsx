import styled from 'styled-components'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export const Map = () => {
  return (
    <StyledMap className="relative">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: '350px',
          width: '450px',
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </StyledMap>
  )
}

const StyledMap = styled.div``
