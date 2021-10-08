import { useRouter } from 'next/router'
import styled from 'styled-components'
import { CalendarIcon, PersonIcon } from 'utils/icons'
import { useJobsContext } from '../jobs-context'

export const JobsList = () => {
  const {
    jobs: { data },
    selectJob,
  } = useJobsContext()
  const {
    query: { jobId },
  } = useRouter()

  return (
    <StyledJobsList className="bg-white pt-20 pb-20">
      <div className="pl-10 mb-20">
        <h3>Best worldwide jobs</h3>
      </div>

      {data?.map(job => (
        <div
          className={`job pointer p-10 d-f ${
            job.id == parseInt(jobId as string) ? 'selected' : ''
          }`}
          key={job.id}
          onClick={() => {
            selectJob(job)
          }}
        >
          <img src={job.image} className="mr-10" />
          <div className="job-info">
            <h4>{job.title}</h4>
            <p className="status">
              <strong>Status:</strong> {job.status}
            </p>
            <div className="d-f date align-items-c">
              <PersonIcon />
              <span>{job.assigned_to}</span>
            </div>
            <div className="d-f date align-items-c">
              <CalendarIcon />
              <span>{new Date(job.date).toDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </StyledJobsList>
  )
}

const StyledJobsList = styled.div`
  max-height: 100%;
  height: calc(100vh - 45px);
  overflow: scroll;
  width: 40%;

  .job {
    &:hover,
    &.selected {
      background-color: #eeeeee;
    }
    color: #4d4d4d;

    .status {
      font-size: 1.3rem;

      strong {
        font-weight: 500;
      }
    }

    img {
      width: 60px;
      height: 60px;
    }

    h4 {
      color: #2378da;
      margin-bottom: 5px;
      font-size: 15px;
      font-weight: 500;
    }

    .date {
      svg {
        margin-right: 5px;
      }
      font-size: 1.3rem;
    }
  }
`
