import * as React from 'react'

export const AuthContextProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false)

  return <authContext.Provider value={{ isAuth, setIsAuth }}>{children}</authContext.Provider>
}

interface AuthContext {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const authContext = React.createContext<AuthContext>(undefined as unknown as AuthContext)

export function useAuthContext() {
  const ctx = React.useContext(authContext)

  if (!ctx) {
    const env = process.env.NODE_ENV
    if (env == 'development') {
      throw new Error('useAuthContext must be used within <AuthContextProvider />')
    } else if (env == 'AuthContextion') {
      console.error('useAuthContext must be used within <AuthContextProvider />')
      return {} as AuthContext
    }
  }

  return ctx
}
