import * as React from 'react'
import { useAsync } from 'hooks'
import * as API from '../api'

export const JobsProvider: React.FC = ({ children }) => {
  const { data: jobs, run } = useAsync<any>({})
  const [selectedJob, setSelectedJob] = React.useState<any>({})

  React.useEffect(() => {
    run(API.getAllJobs, {})
  }, [run])

  return (
    <jobsContext.Provider value={{ jobs, selectedJob, setSelectedJob }}>
      {children}
    </jobsContext.Provider>
  )
}

interface JobsContext {
  jobs: any
  selectedJob: any
  setSelectedJob: any
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
