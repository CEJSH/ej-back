import type { AppProps } from 'next/app'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import Layout from '@shared/Layout'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import Navbar from '@shared/Navbar'
import { AlertContextProvider } from '@context/AlertContext'
import ErrorBoundary from '@shared/ErrorBoundary'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <ErrorBoundary>
            <AlertContextProvider>
              <Hydrate state={dehydratedState}>
                <Navbar />
                <Component {...pageProps} />
              </Hydrate>
            </AlertContextProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
