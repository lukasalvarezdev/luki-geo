import { Status } from 'utils/types'

export interface SuspenseProps {
  children: React.ReactNode
  status: Status
  loading: React.FC | JSX.Element
  loadingWhenIdle?: boolean
}

export const Suspense = ({ children, loading, status, loadingWhenIdle }: SuspenseProps) => {
  if (loadingWhenIdle && (status === 'idle' || status === 'pending')) return <>{loading}</>
  if (status === 'pending') return <>{loading}</>
  if (status === 'resolved') return <>{children}</>
  return <></>
}
