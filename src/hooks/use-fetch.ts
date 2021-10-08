import * as React from 'react'
import { useSafeDispatch } from 'hooks'
import { Status } from 'utils/types'
import { RequestRes } from 'utils/fetch-middleware'

export function useFetch() {
  const [{ status, error }, _dispatch] = React.useReducer(reducer, initialState)
  const dispatch = useSafeDispatch(_dispatch)

  const onPromiseError = React.useCallback(
    (err: string) => {
      dispatch({
        status: 'rejected',
        error: err,
      })
    },
    [dispatch],
  )

  const onPromiseSuccess = React.useCallback(
    function <T>(data: T) {
      dispatch({
        status: 'resolved',
      })
      return data
    },
    [dispatch],
  )

  const fetchData = React.useCallback(
    async function <T, Fn extends (...args: any[]) => RequestRes<T>>(
      promise: Fn,
      options: FetchOptions<T>,
      ...args: Parameters<typeof promise>
    ): Promise<T | void> {
      if (!promise) return throwNoPromiseError()
      const { onFailure, onSuccess } = options
      dispatch({
        status: 'pending',
      })

      const [data, error] = await promise(...args)

      if (data === null || error) {
        onFailure?.(error || 'There was an error')
        return onPromiseError(error || 'There was an error')
      }

      onSuccess?.(data)
      return onPromiseSuccess(data)
    },
    [onPromiseError, onPromiseSuccess, , dispatch],
  )

  return { fetchData, status, error }
}

export type UseFetchReturn = ReturnType<typeof useFetch>

export type FetchOptions<T> = {
  onSuccess?: (data: T) => void
  onFailure?: (error: string) => void
  loadingMessage?: string
  errorMessage?: string
  successMessage?: string
}

function throwNoPromiseError() {
  const env = process.env.NODE_ENV
  if (env == 'development') {
    throw new Error('fetchData needs to receive a promise')
  } else if (env == 'production') {
    // show user alert
    return
  }
}

const reducer = (curr: InitialStateProps, updates: Partial<InitialStateProps>) => ({
  ...curr,
  ...updates,
})

type InitialStateProps = typeof initialState
const initialState = {
  status: 'idle' as Status,
  error: '',
}
