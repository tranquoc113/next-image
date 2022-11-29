import "../styles/globals.css";
import { EmptyLayout } from "component/layout";
import { AppPropsWithLayout } from "@/models";
import { SWRConfig } from "swr";
import axiosClient from "@/api-client/axios-client";
import { createEmotionCache, theme } from "@/utils";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

const clientSideEmotionCache = createEmotionCache()

function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false, // khi gọi api bị lỗi sẽ gọi lại
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
export default App;
