import { FullMap } from 'components/full-map-view'
import { JobsProvider } from 'components/jobs-context'
import { AuthApp } from 'components/protected-route'

export default function FullMapPage() {
  return (
    <AuthApp>
      <JobsProvider>
        <FullMap />
      </JobsProvider>
    </AuthApp>
  )
}
