import Img from "@/components/shared/Img/Img";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LoginIcon from "@mui/icons-material/Login";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Badge, useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { logoutAPI } from "api/authServices";
import { signOut } from "firebase/auth";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { ColorModeContext } from "lib/theme/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { authentication } from "../../config/firebase.config";
import { mainNav } from "../../utils/fake-data/header-navs";
import Menu from "./components/Menu";

const Defaultheader = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const cartItems = useAppSelector((state) => state.cartItems);
  const auth = useSelector((state: any) => state.auth.auth);
  const router = useRouter();
  const activeNav = mainNav.findIndex((e) => e.path === router.pathname);
  const menuLeft = useRef<any>(null);
  const [headerShrink, setHeaderShrink] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

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
  }, [theme.palette.mode]);

  const menuToggle = useCallback(() => {
    menuLeft.current.classList.toggle("active");
  }, []);

  const onHoverMenu = useCallback(() => {
    setIsShowMenu((prevState) => !prevState);
  }, []);

  const handleLogout = () => {
    if (!auth.email) return;
    const promise1 = signOut(authentication);
    const promise2 = logoutAPI(auth.email);
    const promise3 = localStorage.setItem("token", "null");
    Promise.all([promise1, promise2, promise3]).catch((err) => {
      console.log(err);
      alert(err);
    });
  };

  return (
    <div className={`header ${headerShrink && "shrink"}`}>
      <div className="container">
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
                <Link href={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <Link href="/" className="header_logo">
            <Img
              src="/images/Logo-2.png"
              alt="Yolo"
              layout="fill"
              loading="eager"
            />
          </Link>
          <div className="header_menu_right">
            <div
              className="header_menu_item header_menu_right_item"
              onClick={colorMode.toggleColorMode}
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
                  <Link href="/cart">
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
            <div
              className="header_menu_item header_menu_right_item"
              onMouseEnter={onHoverMenu}
              onMouseLeave={onHoverMenu}
            >
              {auth ? (
                <>
                  <AccountCircleOutlinedIcon />
                  {isShowMenu && <Menu handleLogout={handleLogout} />}
                </>
              ) : (
                <Tooltip title="Đăng nhập">
                  <Link href="/login">
                    <LoginIcon />
                  </Link>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Defaultheader);
