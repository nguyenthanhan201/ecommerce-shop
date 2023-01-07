import UserPage from "components/index/user/UserPage";
import Helmet from "components/shared/Helmet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/user/account");
  }, [navigate]);

  return (
    <Helmet title="Quản lí thông tin">
      <UserPage />
    </Helmet>
  );
};

export default Page;
