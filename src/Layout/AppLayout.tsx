import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { Outlet, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar/AppBar";
import { Link } from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DiningOutlined from "@mui/icons-material/DiningOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import { useLocation } from "react-router-dom";
import useLoginOutActions from "../actions/useUserActions";
import {
  ArrowForwardIosOutlined,
  Brightness7Outlined,
  GTranslateOutlined,
  Logout,
  Settings,
} from "@mui/icons-material";
import {
  IconButton,
  Toolbar,
  Avatar,
  ListItemIcon,
  Divider,
  Button,
} from "@mui/material";
import { useRecoilState } from "recoil";
import TableDrawer from "../components/TableDrawer";
import CartDrawer from "../components/CartDrawer";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import tableState from "../state/tableState";
import { ModeToggle } from "../app/theme";

const AppLayout = () => {
  const profileMenuId = "primary-account-menu";
  const location = useLocation();
  const loginOutActions = useLoginOutActions();
  const tableDrawer = useRef<any>();
  const cartDrawer = useRef<any>();
  const [anchorProfileMenu, setAnchorProfileMenu] =
    useState<null | HTMLElement>(null);
  const isProfileMenuOpen = Boolean(anchorProfileMenu);
  const [table, setTable] = useRecoilState(tableState);

  const logout = async () => {
    await loginOutActions.loginOut();
  };

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
          logout();
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
        onClick={handleProfileMenuClose}
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
      <MenuItem sx={{ display: "flex" }} onClick={handleProfileMenuClose}>
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
              src="https://qy-jz.oss-cn-beijing.aliyuncs.com/jz/%E9%AB%98%E6%B8%85logo%E9%80%8F%E6%98%8E%E5%BA%95%E5%8E%9F%E8%89%B2%E5%AD%97.png"
              alt="logo"
            />
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          {location.pathname === "/" && (
            <>
              <Button
                sx={{ fontSize: "1.2rem" }}
                color="inherit"
                onClick={() => {
                  tableDrawer.current.toggleDrawer();
                }}
              >
                {table}
              </Button>
              <Button onClick={() => cartDrawer.current.toggleDrawer()}>
                <Badge badgeContent={12}>
                  <Typography fontSize="xl">🛍</Typography>
                </Badge>
              </Button>
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}
          {/* <ModeToggle /> */}
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
        <TableDrawer ref={tableDrawer} />
        <CartDrawer ref={cartDrawer} />
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
