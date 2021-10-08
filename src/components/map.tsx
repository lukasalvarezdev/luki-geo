import * as React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

export interface MapProps {
  position: any
  children: React.ReactNode
  style?: any
  zoom?: number
}

export const Map = ({ position, children, style, zoom }: MapProps) => {
  return (
    <div className="relative">
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        key={position}
        style={style}
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
