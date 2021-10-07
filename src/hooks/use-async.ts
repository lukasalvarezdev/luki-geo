import * as React from 'react'
import { useFetch, useSafeDispatch, FetchOptions, RequestRes } from 'hooks'

export function useAsync<Data>(initialState: Data) {
  const { error, fetchData, status } = useFetch()
  const [data, _setData] = React.useState(initialState)
  const setData = useSafeDispatch(_setData)

  const run = React.useCallback(
    function <Fn extends (...args: any) => RequestRes<T>, T>(
      promise: Fn,
      opts?: FetchOptions<Data> & { preventDispatch?: boolean },
      ...args: Parameters<typeof promise>
    ) {
      fetchData(
        promise,
        {
          ...opts,
          onSuccess: data => {
            !opts?.preventDispatch && setData(data as Data)
            opts?.onSuccess?.(data as Data)
          },
          preventAllAlerts: true,
        },
        ...args,
      )
    },
    [fetchData, setData],
  )
  return { data, setData, error, fetchData, status, run }
}
