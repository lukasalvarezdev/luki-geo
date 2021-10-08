import { UseAuthReturn } from 'hooks/use-auth'
import * as React from 'react'

export const AuthContextProvider: React.FC<UseAuthReturn> = ({ children, ...props }) => {
  return <authContext.Provider value={{ ...props }}>{children}</authContext.Provider>
}

const authContext = React.createContext<UseAuthReturn>(undefined as unknown as UseAuthReturn)

export function useAuthContext() {
  const ctx = React.useContext(authContext)

  if (!ctx) {
    const env = process.env.NODE_ENV
    if (env == 'development') {
      throw new Error('useAuthContext must be used within <AuthContextProvider />')
    } else if (env == 'AuthContextion') {
      console.error('useAuthContext must be used within <AuthContextProvider />')
      return {} as UseAuthReturn
    }
  }

  return ctx
}
