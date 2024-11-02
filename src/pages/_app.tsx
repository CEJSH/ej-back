import type { AppProps } from 'next/app'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import Layout from '@shared/Layout'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Layout>
  )
}
