import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Badge, useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { logoutAPI } from "api/authServices";
import { signOut } from "firebase/auth";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { ColorModeContext } from "lib/theme/theme";
import { memo, useContext, useEffect, useRef, useState } from "react";
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
];

const Defaultheader = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const cartItems = useAppSelector((state) => state.cartItems);
  const auth = useSelector((state: any) => state.auth.auth);
  // console.log("👌 ~ auth", auth);
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
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
    const darkTheme = theme.palette.mode === "dark";
    const root = document.documentElement;
    root?.style.setProperty("--main-bg", darkTheme ? "#262833" : "#fff");
    root?.style.setProperty("--main-color", darkTheme ? "#fff" : "#262833");
    root?.style.setProperty(
      "--txt-second-color",
      darkTheme ? "#fff" : "#8d8d8d"
    );
    localStorage.setItem("dark", darkTheme === true ? "true" : "false");
  }, [theme.palette.mode]);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const handleLogout = () => {
    if (!auth.email) return;
    signOut(authentication);
    logoutAPI(auth.email);
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
                onClick={() => colorMode.toggleColorMode()}
              >
                {theme.palette.mode === "dark" ? (
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
                      <Link to="/user/account" className="dropdown_item">
                        <AccountCircleOutlinedIcon
                          sx={{ fontSize: "80% !important" }}
                        />
                        <span>Tài khoản của tôi</span>
                      </Link>
                      <Link to="/user/orders" className="dropdown_item">
                        <MonetizationOnOutlinedIcon
                          sx={{ fontSize: "80% !important" }}
                        />
                        <span>Đơn hàng của tôi</span>
                      </Link>
                      <Link to="/admin" className="dropdown_item">
                        <AdminPanelSettingsOutlinedIcon
                          sx={{ fontSize: "80% !important" }}
                        />
                        <span>Trang Admin</span>
                      </Link>
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
