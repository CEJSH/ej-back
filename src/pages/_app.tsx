import type { AppProps } from 'next/app'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import Layout from '@shared/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Layout>
  )
}
