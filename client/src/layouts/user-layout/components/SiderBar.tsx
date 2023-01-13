import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Link from "next/link";
import { useRouter } from "next/router";

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
];

const SiderBar = () => {
  const router = useRouter();
  return (
    <div className="side-bar">
      <h2>Thông tin người dùng</h2>
      <ul className="side-bar__content">
        {listSidebar.map((item, index) => {
          const isSelect = router.pathname === item.path;
          return (
            <li key={index}>
              <Link
                href={item.path}
                className={`side-bar__content__item ${isSelect && "active"}`}
              >
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
