import { CssBaseline } from "@mui/material";
import Sidebar from "components/index/admin/components/global/Sidebar";
import Topbar from "components/index/admin/components/global/Topbar";
import Helmet from "components/shared/Helmet";

const AdminLayout = ({ ...props }: any) => {
  return (
    <Helmet title="Trang Admin">
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content2">
          <Topbar />
          {props.children}
        </main>
      </div>
    </Helmet>
  );
};

export default AdminLayout;
