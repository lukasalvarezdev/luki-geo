import * as React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

interface MapProps {
  position: any
  children: React.ReactNode
}

export const Map = ({ position, children }: MapProps) => {
  return (
    <div className="relative">
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={3}
        scrollWheelZoom={false}
        key={position}
        style={{
          height: '550px',
          width: '650px',
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {children}
      </MapContainer>
    </div>
  )
}

export const LocationMarker = ({ position, children }: MapProps) => {
  const map = useMapEvents({
    locationfound() {
      map.panTo(position)
    },
  })

  React.useEffect(() => {
    map.locate()
  }, [position, map])

  return position === null ? null : <Marker position={position}>{children}</Marker>
}
