import styled from 'styled-components'
import { useJobsContext } from './jobs-context'
import { isEmptyObject } from 'utils/helpers'
import dynamic from 'next/dynamic'
import { CalendarIcon, PersonIcon } from 'utils/icons'
import { MapProps } from './map'
const Map = dynamic<MapProps>(() => import('./map').then(m => m.Map), { ssr: false })
const LocationMarker = dynamic<MapProps>(() => import('./map').then(m => m.LocationMarker), {
  ssr: false,
})

export const JobOverview = () => {
  const { selectedJob } = useJobsContext()

  if (isEmptyObject(selectedJob)) return null

  return (
    <StyledJobOverview className="p-20">
      <div className="mb-20">
        <h2 className="mb-20">{selectedJob.title}</h2>
        <p>
          <strong>Status:</strong> {selectedJob.status}
        </p>
        <div className="mb-10">
          <h4>Job details</h4>
          <p>{selectedJob.description} </p>
        </div>
        <div className="d-f date align-items-c">
          <PersonIcon />
          <span>{selectedJob.assigned_to}</span>
        </div>
        <div className="d-f date align-items-c">
          <CalendarIcon />
          <span>{new Date(selectedJob.date).toDateString()}</span>
        </div>
      </div>

      <Map
        position={{
          latitude: parseFloat(selectedJob.latitude),
          longitude: parseFloat(selectedJob.longitude),
        }}
        style={{
          width: '100%',
          height: '450px',
        }}
        zoom={5}
      >
        <LocationMarker position={{ lat: selectedJob.latitude, lng: selectedJob.longitude }} />
      </Map>
    </StyledJobOverview>
  )
}

const StyledJobOverview = styled.div`
  height: 100%;
  width: 60%;

  strong {
    font-weight: 500;
  }

  p,
  span {
    font-size: 1.4rem;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`
