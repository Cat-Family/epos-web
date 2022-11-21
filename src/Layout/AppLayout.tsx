import React, { useLayoutEffect, useRef, useState } from "react";
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
import useLoginOutActions from "../hooks/useUserActions";
import {
  AdminPanelSettingsOutlined,
  ArrowForwardIosOutlined,
  Brightness7Outlined,
  GTranslateOutlined,
  Logout,
  Settings,
  SyncAltOutlined,
} from "@mui/icons-material";
import { IconButton, Toolbar, ListItemIcon, Divider } from "@mui/material";
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
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";

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
  const colors = ["primary", "info", "danger", "success"] as const;
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
        <Avatar sx={{ borderRadius: "sm" }} />
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose} component={Link} to="/studio">
        <ListItemIcon>
          <AdminPanelSettingsOutlined fontSize="small" />
        </ListItemIcon>
        店铺
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
          <Typography
            variant="plain"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            千渝掌柜
          </Typography>

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
          <ModeToggle />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={profileMenuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar
              sx={{
                borderRadius: "sm",
              }}
            />
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

      <Paper
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
        elevation={3}
      >
        <Tabs
          size="lg"
          aria-label="Bottom Navigation"
          value={value}
          onChange={(event, newValue) =>
            navigate(
              newValue === 0 ? "/" : newValue === 1 ? "/bills" : "/report"
            )
          }
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            backgroundImage:
              "linear-gradient(rgba(255 255 255 / 0.08), rgba(255 255 255 / 0.08))",
            maxWidth: 400,
            mx: "auto",
            "--Tabs-gap": "8px",
            "--joy-shadowChannel":
              theme.vars.palette[colors[value]].darkChannel,
            [`& .${tabClasses.root}`]: {
              boxShadow: "none",
              borderRadius: "lg",
              whiteSpace: "nowrap",
              transition: "0.3s",
              fontWeight: "lg",
              flex: 1,
              [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                opacity: 0.72,
              },
            },
          })}
        >
          <TabList variant="plain" sx={{ "--List-decorator-size": "28px" }}>
            <Tab
              orientation="vertical"
              {...(value === 0 && { variant: "soft", color: colors[0] })}
            >
              <ListItemDecorator>
                <DiningOutlined />
              </ListItemDecorator>
              点餐
            </Tab>
            <Tab
              orientation="vertical"
              {...(value === 1 && { variant: "soft", color: colors[1] })}
            >
              <ListItemDecorator>
                <RestoreIcon />
              </ListItemDecorator>
              账单
            </Tab>
            <Tab
              orientation="vertical"
              {...(value === 2 && { variant: "soft", color: colors[3] })}
            >
              <ListItemDecorator>
                <AssignmentOutlinedIcon />
              </ListItemDecorator>
              报表
            </Tab>
          </TabList>
        </Tabs>
      </Paper>
    </Box>
  );
};

export default AppLayout;
