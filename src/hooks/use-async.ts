import * as React from 'react'
import { useFetch, useSafeDispatch, FetchOptions } from 'hooks'
import { RequestRes } from 'utils/fetch-middleware'

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
        },
        ...args,
      )
    },
    [fetchData, setData],
  )
  return { data, setData, error, fetchData, status, run }
}
