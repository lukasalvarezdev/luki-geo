import * as React from 'react'
import { useSafeDispatch } from 'hooks'
import { Status } from 'utils/types'

export function useFetch() {
  const [{ status, error }, _dispatch] = React.useReducer(reducer, initialState)
  const dispatch = useSafeDispatch(_dispatch)

  const onPromiseError = React.useCallback(
    (err: string, options: FetchOptions<any>) => {
      const { preventErrorAlert, errorMessage, preventAllAlerts } = options

      dispatch({
        status: 'rejected',
        error: err,
      })
    },
    [dispatch],
  )

  const onPromiseSuccess = React.useCallback(
    function <T>(data: T, options: FetchOptions<any>) {
      const { preventSuccesAlert, successMessage, preventAllAlerts } = options
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
      const { onFailure, onSuccess, preventAllAlerts, preventLoadingAlert } = options
      dispatch({
        status: 'pending',
      })

      const [data, error] = await promise(...args)

      if (data === null || error) {
        onFailure?.(error || 'There was an error')
        return onPromiseError(error || 'There was an error', options)
      }

      onSuccess?.(data)
      return onPromiseSuccess(data, options)
    },
    [onPromiseError, onPromiseSuccess, , dispatch],
  )

  return { fetchData, status, error }
}

export type UseFetchReturn = ReturnType<typeof useFetch>

export type FetchOptions<T> = {
  preventLoadingAlert?: boolean
  preventErrorAlert?: boolean
  preventSuccesAlert?: boolean
  preventAllAlerts?: boolean
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

export type RequestRes<T> = Promise<[T | null, null | string]>
