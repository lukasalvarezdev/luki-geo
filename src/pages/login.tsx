import * as API from 'api'
import { useAuthContext } from 'auth-context/store'
import { useFetch } from 'hooks'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

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
  }, [isAuth])

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={userInfo.email} onChange={handleChange} name="email" />
      <input
        type="password"
        value={userInfo.password}
        onChange={handleChange}
        name="password"
      />
      {error}
      <button>Submit</button>
    </form>
  )
}
