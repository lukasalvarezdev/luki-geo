import * as React from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from 'auth-context/store'

export const AuthApp = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter()
  const { isAuth, status } = useAuthContext()

  React.useEffect(() => {
    if (!isAuth && status === 'resolved') push('/')
  }, [isAuth, push])

  return <>{children}</>
}
