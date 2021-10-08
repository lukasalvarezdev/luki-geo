import * as React from 'react'
import { useAuthContext } from 'auth-context/store'
import styled from 'styled-components'
import Link from 'next/link'
import { StrokedDownArrowIcon } from 'utils/icons'

export const Header = () => {
  const { user } = useAuthContext()

  return (
    <StyledHeader className="relative bg-white normal-shadow">
      <div className="container d-f align-items-c justify-content-sb h-100 p-20">
        <h4>Hello, {user.name || 'User'}</h4>
        <NavMenu />
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  height: 60px;
`

const NavMenu = () => {
  const { user } = useAuthContext()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <StyledNavMenu className="account d-f align-items-c relative">
      <div className="menu d-f align-items-c mr-20">
        <Link href="/">
          <a className="d-b mr-20">View all jobs</a>
        </Link>
        <Link href="/map-view">
          <a className="d-b mr-20">View full map</a>
        </Link>
      </div>
      <div onClick={() => setIsOpen(!isOpen)} className="d-f align-items-c pointer">
        <div className="profile-img mr-20 pointer"></div>
        <div className="info mr-20 pointer">
          <p className="name">{user.name || 'User'}</p>
        </div>
        <StrokedDownArrowIcon />
      </div>
      {isOpen ? <ContextMenu /> : null}
    </StyledNavMenu>
  )
}

const ContextMenu = () => {
  const { logout } = useAuthContext()

  return (
    <div className="context-menu normal-shadow border-radius-primary pointer">
      <p
        onClick={e => {
          e.preventDefault()
          logout()
        }}
      >
        Log out
      </p>
    </div>
  )
}

const StyledNavMenu = styled.div`
  .context-menu {
    background-color: #fff;
    position: absolute;
    padding: 10px 20px;
    top: calc(100% + 22px);
    right: 0;
    width: 100%;
    max-width: 150px;
    z-index: 1000;
  }

  svg {
    width: 16px;
  }

  .profile-img {
    width: 35px;
    height: 35px;
    background-color: var(--medium-gray);
    border-radius: 50%;
  }

  .name {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 0.7;
  }
  .role {
    font-size: 1.2rem;
    color: var(--medium-gray);
  }
`
