import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import variables from "@/styles/variables.module.scss";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={variables.colorPrimaryMain} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Provider store={store}>
        <div id="modal"></div>
        <div id="backdrop"></div>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
