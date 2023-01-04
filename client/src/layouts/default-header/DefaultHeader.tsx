import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Badge } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { signOut } from "firebase/auth";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/Logo-2.png";
import { authentication } from "../../config/firebase.config";

const mainNav = [
  {
    display: "Trang Chủ",
    path: "/",
  },
  {
    display: "Sản Phẩm",
    path: "/catalog",
  },
  // {
  //   display: "Phụ Kiện",
  //   path: "/accessories",
  // },
];

const Defaultheader = () => {
  const cartItems = useAppSelector((state) => state.cartItems);
  // console.log("👌 ~ cartItems", cartItems);
  const auth = useSelector((state: any) => state.auth.auth);
  // console.log("👌 ~ auth", auth);
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("dark") === "true" ? true : false
  );
  const menuLeft = useRef<any>(null);
  const [headerShrink, setHeaderShrink] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setHeaderShrink(true);
      } else {
        setHeaderShrink(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--main-bg", darkTheme ? "#262833" : "#fff");
    root?.style.setProperty("--main-color", darkTheme ? "#fff" : "#262833");
    root?.style.setProperty(
      "--txt-second-color",
      darkTheme ? "#fff" : "#8d8d8d"
    );
    localStorage.setItem("dark", darkTheme === true ? "true" : "false");
  }, [darkTheme]);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const darkToggle = (e: any) => {
    e.preventDefault();
    const dark_toggle: any = document.querySelector(".dark_toggle");
    dark_toggle.classList.toggle("bx-sun");
    dark_toggle.classList.toggle("bx-moon");
  };

  const handleLogout = () => {
    signOut(authentication);
  };

  return (
    <>
      {/* <PostFiltersForm /> */}
      <div className={`header ${headerShrink && "shrink"}`}>
        <div className="container">
          <div className="header_logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header_menu">
            <div className="header_menu_mobile-toggle" onClick={menuToggle}>
              <i className="bx bx-menu-alt-left"></i>
            </div>
            <div className="header_menu_left" ref={menuLeft}>
              <div className="header_menu_left_close" onClick={menuToggle}>
                <i className="bx bx-chevron-left"></i>
              </div>
              {mainNav.map((item, index) => (
                <div
                  key={index}
                  className={`header_menu_item header_menu_left_item ${
                    index === activeNav ? "active" : ""
                  }`}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span>{item.display}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="header_menu_right">
              <div
                className="header_menu_item header_menu_right_item"
                onClick={(e) => {
                  setDarkTheme(!darkTheme);
                  darkToggle(e);
                }}
              >
                {darkTheme ? (
                  <DarkModeOutlinedIcon className="dark_toggle" />
                ) : (
                  <WbSunnyOutlinedIcon className="dark_toggle" />
                )}
              </div>
              {auth && (
                <div className="header_menu_item header_menu_right_item">
                  <Tooltip title="Giỏ hàng">
                    <Link to="/cart">
                      <Badge
                        badgeContent={
                          cartItems.value
                            ? Object.keys(cartItems.value).length
                            : 0
                        }
                        color="primary"
                      >
                        <LocalMallOutlinedIcon />
                      </Badge>
                    </Link>
                  </Tooltip>
                </div>
              )}
              <div className="header_menu_item header_menu_right_item">
                {auth ? (
                  <>
                    <AccountCircleOutlinedIcon />
                    <div className="dropdown">
                      <p className="dropdown_item">
                        <AccountCircleOutlinedIcon
                          sx={{ fontSize: "80% !important" }}
                        />
                        <span>Tài khoản của tôi</span>
                      </p>
                      <p className="dropdown_item">
                        <MonetizationOnOutlinedIcon
                          sx={{ fontSize: "80% !important" }}
                        />
                        <span>Đơn hàng của tôi</span>
                      </p>
                      <p className="dropdown_item">
                        <Link to="/admin">
                          <AdminPanelSettingsOutlinedIcon
                            sx={{ fontSize: "80% !important" }}
                          />
                          <span>Trang Admin</span>
                        </Link>
                      </p>
                      <p className="dropdown_item" onClick={handleLogout}>
                        <LogoutOutlinedIcon
                          sx={{ fontSize: "80% !important" }}
                        />
                        <span>Đăng xuất</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <Tooltip title="Đăng nhập">
                    <Link to="/login">
                      <LoginIcon />
                    </Link>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Defaultheader);
