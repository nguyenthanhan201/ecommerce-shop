import { ToastProvider } from "@/lib/providers/toast-provider";
import store from "@/lib/redux/store";
import { ColorModeContext, useMode } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material";
import { DefaultSeo, NextSeo } from "next-seo";
import { Fragment } from "react";
import { Provider } from "react-redux";
import "../src/sass/index.scss";

type Props = {
  Component: any;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  const [theme, colorMode] = useMode();

  return (
    <>
      <DefaultSeo
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            href: "/images/favicon.png",
          },
        ]}
      />
      {pageProps.seo && <NextSeo {...pageProps.seo} />}
      <ColorModeContext.Provider value={colorMode as any}>
        <ThemeProvider theme={theme as any}>
          <ToastProvider>
            <Provider store={store}>
              <Layout {...layoutProps}>
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </ToastProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default MyApp;
