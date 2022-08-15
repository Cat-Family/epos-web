import React, { useLayoutEffect, useRef, useState } from "react";
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
  SyncAltOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  Toolbar,
  Avatar,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useRecoilState } from "recoil";
import TableDrawer from "../components/TableDrawer";
import CartDrawer from "../components/CartDrawer";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import tableState from "../state/tableState";
import cartState from "../state/cartState";
import { ModeToggle } from "../app/theme";
import { enqueueSnackbar } from "notistack";
import Button from "@mui/joy/Button";

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
  const [cart, setCart] = useRecoilState<any>(cartState);

  const logout = async () => {
    await loginOutActions.loginOut();
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    cartDrawer.current.closeDrawer();

    setAnchorProfileMenu(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorProfileMenu(null);
  };

  const [value, setValue] = useState<number>(
    location.pathname === "/" ? 0 : location.pathname === "/bills" ? 1 : 2
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (location.pathname === "/") {
      setValue(0);
    }
    if (location.pathname === "/bills") {
      setValue(1);
    }
    if (location.pathname === "/report") {
      setValue(2);
    }
  }, [location.pathname]);

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfileMenu}
      id={profileMenuId}
      // keepMounted
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
        设置
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
        注销
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
        <Typography sx={{ flexGrow: "1" }}>主题</Typography>

        <ListItemIcon sx={{ justifyContent: "end" }}>
          <ArrowForwardIosOutlined fontSize="small" />
        </ListItemIcon>
      </MenuItem>
      <MenuItem sx={{ display: "flex" }} onClick={handleProfileMenuClose}>
        <ListItemIcon>
          <GTranslateOutlined />
        </ListItemIcon>
        <Typography sx={{ flexGrow: "1" }}>语言</Typography>
        <ListItemIcon sx={{ justifyContent: "end" }}>
          <ArrowForwardIosOutlined fontSize="small" />
        </ListItemIcon>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar
        position="fixed"
        sx={
          {
            // backdropFilter: "blur(20px)",
            // bgcolor: "primary.AppBar",
          }
        }
      >
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
                aria-label="switch-table"
                variant="plain"
                color="neutral"
                disabled={table === "未选择"}
                sx={{ color: "inherit" }}
                onClick={() => {
                  if (table === "未选择") {
                    enqueueSnackbar("未选择桌位", { variant: "warning" });
                  } else {
                    tableDrawer.current.switchTable();
                  }
                }}
              >
                <SyncAltOutlined />
              </Button>
              <Button
                aria-label="table-number"
                sx={{ fontSize: "1.2rem", color: "inherit" }}
                color="neutral"
                variant="plain"
                onClick={() => {
                  tableDrawer.current.toggleDrawer();
                }}
              >
                {table}
              </Button>
              <Button
                aria-label="cart-number"
                variant="plain"
                disabled={table === "未选择"}
                onClick={() => {
                  if (table === "未选择") {
                    enqueueSnackbar("未选择桌位", { variant: "warning" });
                  } else {
                    tableDrawer.current.closeDrawer();
                    cartDrawer.current.toggleDrawer();
                  }
                }}
              >
                <Badge
                  badgeContent={
                    cart?.sku?.cartMessage?.reduce(
                      (previousValue: any, currentValue: any) => {
                        return previousValue + currentValue.productNum;
                      },
                      0
                    ) || 0
                  }
                >
                  <Typography sx={{ color: "inherit" }} fontSize="xl">
                    🛍
                  </Typography>
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
      <Paper elevation={3}>
        <BottomNavigation showLabels />
      </Paper>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            navigate(
              newValue === 0 ? "/" : newValue === 1 ? "/bills" : "/report"
            );
          }}
        >
          <BottomNavigationAction label="点餐" icon={<DiningOutlined />} />
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
