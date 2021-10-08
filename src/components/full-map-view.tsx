import styled from 'styled-components'
import { useJobsContext } from './jobs-context'
import dynamic from 'next/dynamic'
const Map = dynamic<any>(() => import('./map').then(m => m.Map), { ssr: false })
const LocationMarker = dynamic<any>(() => import('./map').then(m => m.LocationMarker), {
  ssr: false,
})

export const FullMap = () => {
  const {
    jobs: { data },
  } = useJobsContext()

  return (
    <StyledFullMap className="bg-white p-20 normal-shadow border-radius-primary">
      <Map
        position={{
          latitude: 0,
          longitude: 0,
        }}
      >
        {data?.map(({ latitude, longitude }: any, index: number) => (
          <LocationMarker key={index} position={{ lat: latitude, lng: longitude }} />
        ))}
      </Map>
    </StyledFullMap>
  )
}

const StyledFullMap = styled.div``
