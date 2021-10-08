import styled from 'styled-components'
import { useJobsContext } from './jobs-context'
import dynamic from 'next/dynamic'
const Map = dynamic<any>(() => import('./map').then(m => m.Map), { ssr: false })
const LocationMarker = dynamic<any>(() => import('./map').then(m => m.LocationMarker), {
  ssr: false,
})
const Popup = dynamic<any>(() => import('react-leaflet').then(m => m.Popup), {
  ssr: false,
})
import Link from 'next/link'

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
