export async function request<ResType>(url: string, opts: RequestOptions): RequestRes<ResType> {
  const { parseMethod, expectedStatusCode } = opts

  try {
    const response = await fetch(url, getFetchOptions(opts))
    const parsedRes = await getFetchResults(response, parseMethod, expectedStatusCode)
    return [parsedRes, parsedRes.error]
  } catch (error: any) {
    return [null, error || 'There was an error.']
  }
}

const getFetchResults = async (
  response: Response,
  parseMethod: RequestOptions['parseMethod'] = 'json',
  expectedStatusCode: RequestOptions['expectedStatusCode'] = 200,
) => {
  if (response.status !== expectedStatusCode) {
    const error = await response.json()
    if (!error) throw new Error('There was an error.')

    throw error
  }

  return expectedStatusCode === 204 ? true : await response[parseMethod]()
}

const getFetchOptions = ({
  headers,
  body,
  method,
  preventBodyParsing,
  preventTokenSubmission,
}: RequestOptions): RequestInit => ({
  method: method,
  headers: getHeaders(headers, preventTokenSubmission),
  body:
    preventBodyParsing === false ? body : body !== undefined ? JSON.stringify(body) : undefined,
})

function getHeaders(
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
  preventTokenSubmission?: boolean,
) {
  if (!preventTokenSubmission) {
    const token = localStorage.getItem('access_token')
    if (!token) throw new Error('Invalid access token')

    headers['Authorization'] = token
  }

  return headers
}

interface RequestOptions {
  parseMethod?: 'json' | 'text' | 'blob' | 'formData' | 'clone' | 'arrayBuffer'
  expectedStatusCode?: 200 | 201 | 203 | 204
  headers?: Record<string, string>
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: any
  preventTokenSubmission?: boolean
  preventBodyParsing?: boolean
}

export type RequestRes<T> = Promise<[T | null, null | string]>
