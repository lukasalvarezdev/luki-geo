import * as React from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from 'auth-context/store'
import styled from 'styled-components'
import { Header } from './header'

export const AuthApp = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter()
  const { isAuth, status } = useAuthContext()

  React.useEffect(() => {
    if (!isAuth && status === 'resolved') push('/')
  }, [isAuth, push, status])

  return (
    <StyledAuthApp>
      <Header />
      <div className="container bg-white">{children}</div>
    </StyledAuthApp>
  )
}

const StyledAuthApp = styled.div`
  height: 100vh;
  overflow-y: hidden;

  .container {
    max-width: 1000px;
  }
`
