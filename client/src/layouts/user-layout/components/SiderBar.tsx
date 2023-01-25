import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';

const listSidebar = [
  {
    icon: <PersonIcon />,
    title: "Thông tin tài khoản",
    path: "/user/account",
  },
  {
    icon: <ReceiptLongIcon />,
    title: "Quản lí hóa đơn",
    path: "/user/orders",
  },
  {
    icon: <StarsOutlinedIcon />,
    title: "Quản lí đánh giá",
    path: "/user/rating",
  },
];

const SiderBar = () => {
  const router = useRouter();
  return (
    <div className="side-bar">
      <h2>Thông tin người dùng</h2>
      <ul className="side-bar__content">
        {listSidebar.map((item) => {
          const isSelect = router.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`side-bar__content__item ${isSelect && "active"}`}
              >
                <NextSeo title={isSelect ? item.title : ""} />
                {item.icon}
                <p>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SiderBar;
