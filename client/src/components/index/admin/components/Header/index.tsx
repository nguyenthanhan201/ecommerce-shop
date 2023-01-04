import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { tokens } from "lib/theme/theme";

type HeaderProps = {
  title: string;
  subtitle: string;
};
const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
