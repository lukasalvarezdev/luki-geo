import { JobsInfo } from './jobs-context'
import { UserProps } from 'hooks/use-auth'
import { request, RequestRes } from 'utils/fetch-middleware'
interface UserInfo {
  email: string
  password: string
}
interface TokenInfo {
  access_token: string
  expires_in: number
  token_type: string
}
export async function getAuthToken(userInfo: UserInfo): RequestRes<true> {
  const [token, error] = await request<TokenInfo>(
    'https://coding-test.rootstack.net/api/auth/login',
    {
      method: 'POST',
      body: userInfo,
      preventTokenSubmission: true,
    },
  )
  if (!token) {
    return [null, error ?? 'There was an error']
  }
  localStorage.setItem('access_token', `${token.token_type} ${token.access_token}`)
  return [true, error]
}

export async function getMember(): RequestRes<UserProps> {
  const [user, error] = await request<UserProps>(
    'https://coding-test.rootstack.net/api/auth/me',
    {
      method: 'GET',
    },
  )

  return [user, error]
}

export async function getAllJobs(): RequestRes<JobsInfo> {
  const [jobs, error] = await request<JobsInfo>('https://coding-test.rootstack.net/api/jobs', {
    method: 'GET',
  })

  return [jobs, error]
}
