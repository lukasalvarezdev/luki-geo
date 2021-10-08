import styled from 'styled-components'
import { useJobsContext } from './jobs-context'
import dynamic from 'next/dynamic'
const Map = dynamic<MapProps>(() => import('./map').then(m => m.Map), { ssr: false })
const LocationMarker = dynamic<MapProps>(() => import('./map').then(m => m.LocationMarker), {
  ssr: false,
})
const Popup = dynamic<any>(() => import('react-leaflet').then(m => m.Popup), {
  ssr: false,
})
import Link from 'next/link'
import { MapProps } from './map'

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
        style={{
          height: 'calc(100vh - 100px)',
          width: '100%',
        }}
        zoom={3}
      >
        {data?.map((job: any, index: number) => (
          <LocationMarker key={index} position={{ lat: job.latitude, lng: job.longitude }}>
            <Popup>
              <h4>{job.title}</h4>
              <p>Status: {job.status}</p>
              <p>Date: {new Date(job.created_at).toDateString()}</p>
              <Link href={`/?jobId=${job.id}`}>
                <a>view full job</a>
              </Link>
            </Popup>
          </LocationMarker>
        ))}
      </Map>
    </StyledFullMap>
  )
}

const StyledFullMap = styled.div``
