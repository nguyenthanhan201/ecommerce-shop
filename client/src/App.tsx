import { ThemeProvider } from "@mui/material";
import DefaultLayout from "layouts/default-layout/DefaultLayout";
import { ToastProvider } from "lib/providers/toast-provider";
import store from "lib/redux/store";
import { privateRoutes, publicRoutes } from "lib/routes";
import { ColorModeContext, useMode } from "lib/theme/theme";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ToastProvider>
      <ColorModeContext.Provider value={colorMode as any}>
        <ThemeProvider theme={theme as any}>
          <Router>
            <Provider store={store}>
              <Suspense fallback={<div>Đang tải...</div>}>
                <Routes>
                  {publicRoutes.concat(privateRoutes).map((route, index) => {
                    const Layout = route.layout || DefaultLayout;
                    const Page = route.component;
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <Layout>
                            <Page />
                          </Layout>
                        }
                      />
                    );
                  })}
                </Routes>
              </Suspense>
            </Provider>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ToastProvider>
  );
};

export default App;
