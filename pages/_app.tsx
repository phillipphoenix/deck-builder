import Head from "next/head";
import "ts-array-ext";
import "../styles/globals.scss";

import type { AppProps /*, AppContext */ } from "next/app";

const App: React.SFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Deck Builder" />
        <meta name="apple-mobile-web-app-title" content="Deck Builder" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
