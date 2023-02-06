import { ColorModeContext } from "@/lib/theme/theme";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useTheme } from "@mui/material";
import { setCookie } from "cookies-next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const MenuChild = dynamic(() => import("../MenuChild"), { ssr: false });
type MenuProps = {
  handleLogout: () => void;
};

type MenuItemsProps = {
  icon: React.ReactElement;
  title: string;
  to?: string;
  func?: () => void;
  children?: { type: string; data: any };
};

const Menu = ({ handleLogout }: MenuProps) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { i18n } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [isChangedDropdown, setIsChangedDropdown] = useState<boolean>(false);
  const [selectedTypeChild, setSelectedTypeChild] = useState<string | null>(
    null
  );

  const MENU_ITEMS: MenuItemsProps[] = useMemo(() => {
    return [
      {
        icon: <AccountCircleOutlinedIcon sx={{ fontSize: "80% !important" }} />,
        title: "Tài khoản của tôi",
        to: "/user/account",
      },
      {
        icon: (
          <AdminPanelSettingsOutlinedIcon sx={{ fontSize: "80% !important" }} />
        ),
        title: "Trang Admin",
        to: "/admin",
      },
      {
        icon: <LanguageOutlinedIcon sx={{ fontSize: "80% !important" }} />,
        title: "Ngôn ngữ",
        func: () => setIsChangedDropdown(true),
        children: {
          type: "language",
          data: [
            {
              title: "Tiếng Việt",
              func: () => {
                i18n.changeLanguage("vi");
                setCookie("NEXT_LOCALE", "vi", {
                  maxAge: 365 * 24 * 60 * 60,
                });
                router.replace({ pathname, query }, asPath, { locale: "vi" });
              },
            },
            {
              title: "Tiếng Anh",
              func: () => {
                i18n.changeLanguage("en");
                setCookie("NEXT_LOCALE", "en", {
                  maxAge: 365 * 24 * 60 * 60,
                });
                router.replace({ pathname, query }, asPath, { locale: "en" });
              },
            },
          ],
        },
      },
      {
        icon:
          theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon
              className="dark_toggle"
              sx={{ fontSize: "80% !important" }}
            />
          ) : (
            <WbSunnyOutlinedIcon
              className="dark_toggle"
              sx={{ fontSize: "80% !important" }}
            />
          ),
        title: "Giao diện",
        func: () => colorMode.toggleColorMode(),
      },
      {
        icon: <LogoutOutlinedIcon sx={{ fontSize: "80% !important" }} />,
        title: "Đăng xuất",
        func: () => handleLogout(),
      },
    ];
  }, [handleLogout, theme]);

  const childrenItems = useMemo(() => {
    if (selectedTypeChild === null) return [];
    return MENU_ITEMS.filter(
      (item) => item.children?.type === selectedTypeChild
    ).map((obj) => obj.children?.data);
  }, [selectedTypeChild, MENU_ITEMS]);

  return (
    <div
      className={`dropdown ${isChangedDropdown && "expand"}`}
      onMouseLeave={() => setIsChangedDropdown(false)}
    >
      <div className="dropdown-content">
        <div className="dropdown-enter">
          {MENU_ITEMS.map((menu, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  setSelectedTypeChild(menu.children?.type || null)
                }
              >
                {menu.to ? (
                  <Link href={menu.to} className="dropdown_item">
                    {menu.icon}
                    <span>{menu.title}</span>
                  </Link>
                ) : (
                  <p className="dropdown_item" onClick={menu.func}>
                    {menu.icon}
                    <span>{menu.title}</span>
                    {menu.children && (
                      <ArrowBackIosNewOutlinedIcon
                        sx={{
                          fontSize: "80% !important",
                          transform: "rotate(180deg)",
                        }}
                      />
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="dropdown-expand">
          {childrenItems.length !== 0 && (
            <MenuChild
              childrenItems={childrenItems}
              setIsChangedDropdown={setIsChangedDropdown}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
