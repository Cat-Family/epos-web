import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { Outlet, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar/AppBar";
import { IconButton, Toolbar, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DiningOutlined from "@mui/icons-material/DiningOutlined";
import RestoreIcon from "@mui/icons-material/Restore";

const AppLayout = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/">
            <img
              className="logo"
              style={{ height: 32, width: 32 }}
              src="/src/favicon.svg"
              alt="logo"
            />
          </Link>

          <Typography variant="h6" component="h1">
            Logo
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
          </IconButton>
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
          <BottomNavigationAction label="点餐" icon={<DiningOutlined />} />
          <BottomNavigationAction
            label="订单"
            icon={<RoomServiceOutlinedIcon />}
          />
          <BottomNavigationAction label="账单" icon={<RestoreIcon />} />
          <BottomNavigationAction
            label="报表"
            icon={<AssignmentOutlinedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default AppLayout;
