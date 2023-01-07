import { CssBaseline } from "@mui/material";
import Sidebar from "components/index/admin/components/global/Sidebar";
import Topbar from "components/index/admin/components/global/Topbar";

const AdminLayout = ({ ...props }: any) => {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content2">
          <Topbar />
          {props.children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
