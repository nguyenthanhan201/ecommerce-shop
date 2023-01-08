import AccountInfo from "components/index/user/components/AccountInfo/AccountInfo";
import Helmet from "components/shared/Helmet";

const Page = () => {
  return (
    <Helmet title="Thông tin người dùng">
      <AccountInfo />
    </Helmet>
  );
};

export default Page;
