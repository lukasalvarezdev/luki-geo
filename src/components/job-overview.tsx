import styled from 'styled-components'
import { useJobsContext } from './jobs-context'
import { isEmptyObject } from 'utils/helpers'
import dynamic from 'next/dynamic'
const Map = dynamic<any>(() => import('./map').then(m => m.Map), { ssr: false })

export const JobOverview = () => {
  const { selectedJob } = useJobsContext()

  if (isEmptyObject(selectedJob)) return null

  return (
    <StyledJobOverview className="bg-white p-20 normal-shadow border-radius-primary">
      <h2>{selectedJob.title}</h2>
      <p>Status: {selectedJob.status}</p>
      <p>Date: {new Date(selectedJob.created_at).toDateString()}</p>

      <Map />
    </StyledJobOverview>
  )
}

const StyledJobOverview = styled.div``
