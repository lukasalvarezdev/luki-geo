import * as React from 'react'
import { useAsync } from 'hooks'
import * as API from '../api'
import { useRouter } from 'next/router'
import { Suspense } from './suspense'

export const JobsProvider: React.FC = ({ children }) => {
  const {
    query: { jobId },
    push,
  } = useRouter()
  const { data: jobs, run, status } = useAsync<any>({})
  const [selectedJob, setSelectedJob] = React.useState<any>({})

  React.useEffect(() => {
    run(API.getAllJobs, {})
  }, [run])

  React.useEffect(() => {
    const selectedJob = jobs?.data?.find((job: any) => job.id === parseInt(jobId as string))
    if (selectedJob) setSelectedJob(selectedJob)
  }, [jobId, jobs?.data])

  const selectJob = React.useCallback(
    (job: any) => {
      setSelectedJob(job)
      push(`/?jobId=${job.id}`)
    },
    [push],
  )

  return (
    <Suspense status={status} loading={<p>loading...</p>}>
      <jobsContext.Provider value={{ jobs, selectedJob, selectJob }}>
        {children}
      </jobsContext.Provider>
    </Suspense>
  )
}

interface JobsContext {
  jobs: any
  selectedJob: any
  selectJob: any
}

const jobsContext = React.createContext<JobsContext>(undefined as unknown as JobsContext)

export function useJobsContext(): JobsContext {
  const ctx = React.useContext(jobsContext)

  if (!ctx) {
    const env = process.env.NODE_ENV
    if (env == 'development') {
      throw new Error('useJobsContext must be used within <JobsProvider />')
    } else if (env == 'AuthContextion') {
      console.error('useJobsContext must be used within <JobsProvider />')
      return {} as JobsContext
    }
  }

  return ctx
}
