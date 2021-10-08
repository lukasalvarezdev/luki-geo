import styled from 'styled-components'
import { useJobsContext } from './jobs-context'

export const JobsList = () => {
  const {
    jobs: { data },
    setSelectedJob,
  } = useJobsContext()

  return (
    <StyledJobsList>
      <h3>Best worldwide jobs</h3>

      {data?.map((job: any) => (
        <div
          className="job"
          key={job.id}
          onClick={() => {
            setSelectedJob(job)
          }}
        >
          <h4>{job.title}</h4>
          <p>Status: {job.status}</p>
          <p>Date: {new Date(job.created_at).toDateString()}</p>
        </div>
      ))}
    </StyledJobsList>
  )
}

const StyledJobsList = styled.div``
