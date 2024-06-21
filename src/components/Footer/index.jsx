import { Box, Paper } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import ModeSwitcher from "@/components/ModeSwitcher";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: 140,
        },
      }}
    >
      <Paper
        sx={{
          padding: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        elevation={6}
      >
        

        <ModeSwitcher />
      </Paper>
    </Box>
  );
};

export default Footer;
