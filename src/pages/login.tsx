import * as API from 'api'
import { useAuthContext } from 'auth-context'
import { useFetch } from 'hooks'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import styled from 'styled-components'

export default function LoginPage() {
  return <LoginForm />
}

const LoginForm = () => {
  const { push } = useRouter()
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: '',
  })
  const [error, setError] = React.useState('')
  const { fetchData } = useFetch()
  const { login, isAuth } = useAuthContext()

  React.useEffect(() => {
    if (isAuth) push('/')
  }, [isAuth, push])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(info => ({ ...info, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userInfo.email.length || !userInfo.password.length) {
      setError('Both name and password are mandatory')
      return
    }

    fetchData(
      API.getAuthToken,
      {
        onSuccess: () => {
          login()
        },
        onFailure: error => {
          setError(error)
        },
      },
      userInfo,
    )
  }

  return (
    <StyledLogin className="d-f center-f ">
      <form
        onSubmit={handleSubmit}
        className="bg-white normal-shadow border-radius-primary p-20"
      >
        <h3 className="mb-20">Welcome to Luki Geo</h3>

        <div className="form-field mb-10">
          <input type="text" value={userInfo.email} onChange={handleChange} name="email" />
        </div>
        <div className="form-field mb-10">
          <input
            type="password"
            value={userInfo.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <p className="mb-20 error-msg">{error}</p>
        <button className="btn-primary">Submit</button>
      </form>
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  height: 100vh;

  form {
    width: 400px;
  }

  .error-msg {
    color: #db2d2d;
    font-size: 1.3rem;
  }
`
