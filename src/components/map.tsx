import * as React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

export const Map = ({ position, children }: { position: any; children: React.ReactNode }) => {
  return (
    <div className="relative">
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
        {children}
      </MapContainer>
    </div>
  )
}

export const LocationMarker = ({ position }: { position: any }) => {
  const map = useMapEvents({
    locationfound() {
      map.panTo(position, map.getZoom())
    },
  })

  React.useEffect(() => {
    map.locate()
  }, [position, map])

  return position === null ? null : <Marker position={position} />
}
