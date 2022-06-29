import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { Outlet, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar/AppBar";
import { Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AppLayout = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/">
            <img className="logo" src="../logo.svg" alt="logo" />
          </Link>

          <Typography variant="h6" component="h1">
            Logo
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>Test</Box>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>

      <Toolbar />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(
              newValue === 0
                ? "/"
                : newValue === 1
                ? "/orders"
                : newValue === 2
                ? "/bill"
                : "/report"
            );
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default AppLayout;
