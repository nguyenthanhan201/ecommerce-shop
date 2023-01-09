import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, IconButton, useTheme } from "@mui/material";
import { useToast } from "lib/providers/toast-provider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../../../../lib/theme/theme";

const Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  // console.log("👌 ~ theme", theme);
  const tosat = useToast();
  // console.log(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* SEARCH BAR */}
      {/* <Box display={"flex"} borderRadius={"3px"} bgcolor={colors.grey[400]}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}
      {/* ICONS */}
      <Box display="flex">
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeOutlinedIcon />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            tosat.success("Hello");
          }}
        >
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
