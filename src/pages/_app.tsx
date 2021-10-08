import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { AuthContextProvider } from 'auth-context/store'
import { useRouter } from 'next/router'
import { useAuthentication } from 'hooks/use-auth'
import '../styles/globals.css'
import { Suspense } from 'components/suspense'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { isReady } = useRouter()
  const { initAuthentication, isAuth, user, status, logout, getUser, login } =
    useAuthentication()

  React.useEffect(() => {
    if (!isReady) return

    initAuthentication()
  }, [initAuthentication, isReady])

  return (
    <>
      <Head>
        <title>Luki Geo App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Head>

      <Suspense status={status} loading={<p>loading...</p>}>
        <AuthContextProvider
          isAuth={isAuth}
          user={user}
          logout={logout}
          initAuthentication={initAuthentication}
          getUser={getUser}
          login={login}
          status={status}
        >
          <Component {...pageProps} />
        </AuthContextProvider>
      </Suspense>
    </>
  )
}

export default MyApp
