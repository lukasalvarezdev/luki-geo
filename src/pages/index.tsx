import { JobOverview } from 'components/job-overview'
import { JobsProvider } from 'components/jobs-context'
import { JobsList } from 'components/jobs-list'
import { AuthApp } from 'components/protected-route'

export default function HomePage() {
  return (
    <AuthApp>
      <JobsProvider>
        <JobsList />
        <JobOverview />
      </JobsProvider>
    </AuthApp>
  )
}
