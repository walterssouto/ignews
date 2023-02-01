import { Header } from '../components/Header'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
    )
}
