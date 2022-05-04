import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { StyledEngineProvider } from "@mui/material/styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StyledEngineProvider>
  );
}

export default MyApp;
