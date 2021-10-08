import * as React from 'react'
import { useRouter } from 'next/router'
import { useSafeDispatch } from 'hooks'
import { Status } from 'utils/types'
import * as API from 'api'

export function useAuthentication() {
  const { push } = useRouter()
  const [{ user, isAuth, status }, unsafeDispatch] = React.useReducer(reducer, {
    isAuth: false,
    user: {} as any,
    status: 'pending',
  })
  const dispatch = useSafeDispatch(unsafeDispatch)

  const getUser = React.useCallback(async () => {
    const [user, sessionError] = await API.getMember()

    if (!user || sessionError) {
      return dispatch({ status: 'resolved', isAuth: false })
    }

    return dispatch({ status: 'resolved', isAuth: true, user })
  }, [dispatch])

  const initAuthentication = React.useCallback(async (): Promise<void> => {
    getUser()
  }, [getUser])

  function logout() {
    dispatch({ status: 'resolved', isAuth: false, user: {} })
    push('/?logout=true')
    localStorage.clear()
  }

  function login() {
    dispatch({ status: 'resolved', isAuth: true })
    getUser()
    push('/')
  }

  return { initAuthentication, logout, isAuth, user, status, getUser, login }
}
export type UseAuthReturn = ReturnType<typeof useAuthentication>

interface InitialState {
  isAuth: boolean
  user: any
  status: Status
}

const reducer = (curr: InitialState, updates: Partial<InitialState>) => ({
  ...curr,
  ...updates,
})
