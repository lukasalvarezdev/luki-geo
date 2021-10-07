import * as React from 'react'

export function useSafeDispatch<T extends React.Dispatch<any>>(dispatch: T): T {
  const mounted = React.useRef(false)

  React.useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  return React.useCallback(
    // @ts-ignore
    (...args: Parameters<T>) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  ) as T
}
