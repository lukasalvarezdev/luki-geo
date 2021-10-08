import { JobsProvider } from 'components/jobs-context'
import { AuthApp } from 'components/protected-route'

export default function HomePage() {
  return (
    <AuthApp>
      <JobsProvider>
        <h2>Homee</h2>
      </JobsProvider>
    </AuthApp>
  )
}
