import styled from 'styled-components'
import { useJobsContext } from './jobs-context'

export const JobsList = () => {
  const {
    jobs: { data },
    selectJob,
  } = useJobsContext()

  console.log(data)

  return (
    <StyledJobsList className="bg-white pt-20">
      <div className="pl-10 mb-20">
        <h3>Best worldwide jobs</h3>
      </div>

      {data?.map((job: any) => (
        <div
          className="job pointer p-10 d-f"
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
    :hover {
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

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M16 13h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm0-10v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V3c0-.55-.45-1-1-1s-1 .45-1 1zm2 17H6c-.55 0-1-.45-1-1V9h14v10c0 .55-.45 1-1 1z" />
  </svg>
)

const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
  </svg>
)
