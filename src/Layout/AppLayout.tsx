import React, { useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DiningOutlined from "@mui/icons-material/DiningOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import { useLocation } from "react-router-dom";
import type { DrawerProps, RadioChangeEvent } from "antd";
import * as antd from "antd";
import useLoginOutActions from "../actions/useUserActions";
import useTableAction from "../actions/useTableActions";
import {
  ArrowForwardIosOutlined,
  Brightness4Outlined,
  Brightness7Outlined,
  GTranslateOutlined,
  Logout,
  Settings,
  SwapHorizOutlined,
} from "@mui/icons-material";
import { Avatar, MenuItem, Menu, ListItemIcon } from "@mui/material";
import { useRecoilState } from "recoil";
import menuState from "../state/menuState";
import tableState from "../state/tableState";
import { TabPanel } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppLayout = () => {
  const profileMenuId = "primary-account-menu";
  const location = useLocation();
  const loginOutActions = useLoginOutActions();
  const tableAction = useTableAction();
  const [anchorProfileMenu, setAnchorProfileMenu] =
    React.useState<null | HTMLElement>(null);
  const isProfileMenuOpen = Boolean(anchorProfileMenu);
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const [table, setTable] = useRecoilState<any>(tableState);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("top");

  const onClose = () => {
    setVisible(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const logout = async () => {
    await loginOutActions.loginOut();
  };

  const queryTable = async () => {
    const a = await tableAction.getTables();
  };

  const showDrawer = () => {
    queryTable();
    setVisible(true);
  };

  useLayoutEffect(() => {
    tableAction.getTables();
  }, []);

  useLayoutEffect(() => {
    if (table[0]?.categoryType) {
      setValue(table[0].categoryType.toString());
    }
  }, [table]);

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                onClick={handleClickOpen}
              >
                1号
              </Button>
              <IconButton color="inherit" onClick={showDrawer}>
                <SwapHorizOutlined fontSize="small" />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

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

      <antd.Drawer
        title="桌号选择"
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={placement}
        height="200"
      >
        {/*<Box sx={{display: "flex"}}>*/}
        <antd.Space size={[18, 22]} wrap>
          {table?.map((item: any) => (
            <antd.Button type="primary" size="large" shape="circle">
              {item.tableNum}
            </antd.Button>
            // <Button sx={{ width: "0.5rem", height: "2rem" }} color="info" variant="outlined">{item.tableNum}</Button>
          ))}
        </antd.Space>

        {/*</Box>*/}
      </antd.Drawer>

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
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </Box>
  );
};

export default AppLayout;
