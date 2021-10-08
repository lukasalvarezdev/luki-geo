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
  const { data: jobs, run, status } = useAsync<JobsInfo>({} as JobsInfo)
  const [selectedJob, setSelectedJob] = React.useState<any>({})

  React.useEffect(() => {
    run(API.getAllJobs, {})
  }, [run])

  React.useEffect(() => {
    const selectedJob = jobs?.data?.find((job: any) => job.id === parseInt(jobId as string))
    if (selectedJob) setSelectedJob(selectedJob)
  }, [jobId, jobs?.data])

  const selectJob = React.useCallback(
    (job: Job) => {
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
  jobs: JobsInfo
  selectedJob: Job
  selectJob: (job: Job) => void
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

export interface JobsInfo {
  current_page: number
  data: Job[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: [
    {
      url: null
      label: 'Previous'
      active: false
    },
  ]
  next_page_url: string
  path: string
  per_page: 15
  prev_page_url: null
  to: 15
  total: 200
}

interface Job {
  id: number
  title: string
  description: string
  latitude: string
  longitude: string
  image: string
  date: string
  status: string
  assigned_to: string
  created_at: string
  updated_at: string
}
