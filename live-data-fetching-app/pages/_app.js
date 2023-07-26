import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
      <title>NextJs events</title>
        <meta name="description" content='NextJs events'></meta>
        <meta name="viewport" content='initial-scale=1.0, width=device-width'></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
