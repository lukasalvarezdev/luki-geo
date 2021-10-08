import * as React from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from 'auth-context/store'
import styled from 'styled-components'

export const AuthApp = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter()
  const { isAuth, status } = useAuthContext()

  React.useEffect(() => {
    if (!isAuth && status === 'resolved') push('/')
  }, [isAuth, push, status])

  return <StyledAuthApp>{children}</StyledAuthApp>
}

const StyledAuthApp = styled.div`
  padding-top: calc(60px /* header height */);
  padding-left: calc(240px /* sidebar width */);
`
