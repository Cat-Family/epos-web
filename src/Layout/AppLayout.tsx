import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { Outlet, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar/AppBar";
import {
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DiningOutlined from "@mui/icons-material/DiningOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import { useLocation } from "react-router-dom";
import {
  ArrowForwardIosOutlined,
  Brightness4Outlined,
  Brightness7Outlined,
  GTranslateOutlined,
  Logout,
  Settings,
} from "@mui/icons-material";

const AppLayout = () => {
  const profileMenuId = "primary-account-menu";
  const location = useLocation();
  const [anchorProfileMenu, setAnchorProfileMenu] =
    React.useState<null | HTMLElement>(null);
  const isProfileMenuOpen = Boolean(anchorProfileMenu);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfileMenu(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorProfileMenu(null);
  };

  const [value, setValue] = React.useState(
    location.pathname === "/"
      ? 0
      : location.pathname === "/orders"
      ? 1
      : location.pathname === "/bills"
      ? 2
      : 3
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfileMenu}
      id={profileMenuId}
      keepMounted
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 250,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
      </MenuItem>

      <MenuItem
        onClick={handleProfileMenuClose}
        component={Link}
        to="/settings"
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleProfileMenuClose();
        }}
        component={Link}
        to={"/users/signin"}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        logout
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{ display: "flex", justifyContent: "space-between" }}
        onClick={() => {
          handleProfileMenuClose();
        }}
      >
        <ListItemIcon>
          <Brightness7Outlined fontSize="small" />
          {/* <Brightness4Outlined fontSize="small" /> */}
        </ListItemIcon>
        <Typography sx={{ flexGrow: "1" }}>Appearance</Typography>

        <ListItemIcon sx={{ justifyContent: "end" }}>
          <ArrowForwardIosOutlined fontSize="small" />
        </ListItemIcon>
      </MenuItem>
      <MenuItem
        sx={{ display: "flex" }}
        onClick={() => {
          handleProfileMenuClose();
        }}
      >
        <ListItemIcon>
          <GTranslateOutlined />
        </ListItemIcon>
        <Typography sx={{ flexGrow: "1" }}>Language</Typography>
        <ListItemIcon sx={{ justifyContent: "end" }}>
          <ArrowForwardIosOutlined fontSize="small" />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
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
            aria-controls={profileMenuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar src="https://mui.com/static/images/avatar/1.jpg"></Avatar>
          </IconButton>
        </Toolbar>
        {renderProfileMenu}
      </AppBar>

      <Toolbar />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>

      <BottomNavigation />

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
                ? "/bills"
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
