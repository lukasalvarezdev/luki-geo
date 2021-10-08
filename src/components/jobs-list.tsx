import styled from 'styled-components'
import { useJobsContext } from './jobs-context'

export const JobsList = () => {
  const {
    jobs: { data },
    selectJob,
  } = useJobsContext()

  return (
    <StyledJobsList className="bg-white">
      <h3>Best worldwide jobs</h3>

      {data?.map((job: any) => (
        <div
          className="job pointer"
          key={job.id}
          onClick={() => {
            selectJob(job)
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

const StyledJobsList = styled.div`
  position: fixed;
  left: 0;
  top: 60px /* header height */;
  height: 100%;
  width: 340px;
  padding: 30px 0;
  box-shadow: 0px 5px 6px 0px rgb(0 0 0 / 16%);

  .job {
    :hover {
      background-color: #dbdbdb;
    }
  }
`
