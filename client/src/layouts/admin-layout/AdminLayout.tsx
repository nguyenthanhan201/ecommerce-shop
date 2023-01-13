import { tokens } from "@/lib/theme/theme";
import { CssBaseline, useTheme } from "@mui/material";
import useAuth from "lib/hooks/useAuth";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const AdminLayout = ({ ...props }: any) => {
  useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <CssBaseline />
      <div className="admin" style={{}}>
        <Sidebar />
        <main className="w-full h-full">
          <Topbar />
          {props.children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
