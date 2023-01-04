import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "components/index/admin/components/global/Sidebar";
import Topbar from "components/index/admin/components/global/Topbar";
import { ColorModeContext, useMode } from "lib/theme/theme";

const AdminLayout = ({ ...props }: any) => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode as any}>
      <ThemeProvider theme={theme as any}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content2">
            <Topbar />
            {props.children}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AdminLayout;
