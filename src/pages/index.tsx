import { JobOverview } from 'components/job-overview'
import { JobsProvider } from 'components/jobs-context'
import { JobsList } from 'components/jobs-list'
import { AuthApp } from 'components/protected-route'

export default function HomePage() {
  return (
    <AuthApp>
      <JobsProvider>
        <div className="d-f">
          <JobsList />
          <JobOverview />
        </div>
      </JobsProvider>
    </AuthApp>
  )
}
