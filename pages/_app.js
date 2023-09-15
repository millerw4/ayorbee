import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ayor🐝</title>
      </Head>

      <div className="top-bar">
        <Link href="/">
          <h1 id="title">ayor🐝</h1>
        </Link>
      </div>

      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
