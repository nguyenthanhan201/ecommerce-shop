import { useNetWork } from "@/lib/hooks/useNetwork";
import { ToastProvider } from "@/lib/providers/toast-provider";
import store from "@/lib/redux/store";
import { ColorModeContext, useMode } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material";
import { Roboto } from "@next/font/google";
import { DefaultSeo, NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import "../src/i18n/i18n";
import "../src/sass/index.scss";
import Page404 from "./404";

type Props = {
  Component: any;
  pageProps: any;
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["vietnamese"],
});

function MyApp({ Component, pageProps }: Props) {
  const Layout = Component.Layout ? Component.Layout : Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};
  const [theme, colorMode] = useMode();
  const statusNetWork = useNetWork();
  const router = useRouter();
  const { locale } = router;
  // console.log("👌 ~ locale", locale);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  if (!statusNetWork) return <Page404 />;
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
              <main className={roboto.className}>
                <Layout {...layoutProps}>
                  <Component {...pageProps} />
                </Layout>
              </main>
            </Provider>
          </ToastProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
export default MyApp;
