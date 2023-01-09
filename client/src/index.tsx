import { ThemeProvider } from "@mui/material";
import DefaultLayout from "layouts/default-layout/DefaultLayout";
import { ToastProvider } from "lib/providers/toast-provider";
import store from "lib/redux/store";
import { privateRoutes, publicRoutes } from "lib/routes";
import { ColorModeContext, useMode } from "lib/theme/theme";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./sass/index.scss";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode as any}>
      <ThemeProvider theme={theme as any}>
        <ToastProvider>
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
        </ToastProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
