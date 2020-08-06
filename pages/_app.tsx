import "../styles/globals.scss";

import type { AppProps /*, AppContext */ } from "next/app";

const App: React.SFC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
