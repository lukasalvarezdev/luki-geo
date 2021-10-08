import { useAsync } from 'hooks'
import * as React from 'react'
import * as API from '../api'

export const JobsProvider: React.FC = ({ children }) => {
  const { data: jobs, run } = useAsync<any>({})

  React.useEffect(() => {
    run(API.getAllJobs, {})
  }, [run])

  return <jobsContext.Provider value={{ jobs }}>{children}</jobsContext.Provider>
}

interface JobsContext {
  jobs: any
}

const jobsContext = React.createContext<JobsContext>(undefined as unknown as JobsContext)

export function useJobsContext() {
  const ctx = React.useContext(jobsContext)

  if (!ctx) {
    const env = process.env.NODE_ENV
    if (env == 'development') {
      throw new Error('useJobsContext must be used within <JobsProvider />')
    } else if (env == 'AuthContextion') {
      console.error('useJobsContext must be used within <JobsProvider />')
      return {} as any
    }
  }

  return ctx
}
