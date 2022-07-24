import React, {useLayoutEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import {Outlet, useNavigate} from "react-router";
import AppBar from "@mui/material/AppBar/AppBar";
import {Link} from "react-router-dom";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DiningOutlined from "@mui/icons-material/DiningOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import OpenTableStage from "../components/OpenTableStage";
import {useLocation} from "react-router-dom";
import type {DrawerProps, RadioChangeEvent} from 'antd';
import * as antd from 'antd';
import useLoginOutActions from "../actions/useUserActions";
import useTableAction from "../actions/useTableActions";
import {
    ArrowForwardIosOutlined,
    Brightness4Outlined,
    Brightness7Outlined,
    GTranslateOutlined,
    Logout,
    Settings,
} from "@mui/icons-material";
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
import {useRecoilState} from "recoil";
import menuState from "../state/menuState";
import tableState from "../state/tableState";
import {TabPanel} from "@mui/lab";
import ProductDialog from "../components/ProductDialog";

const AppLayout = () => {
    const profileMenuId = "primary-account-menu";
    const location = useLocation();
    const loginOutActions = useLoginOutActions();
    const tableAction = useTableAction();
    const openTableStage = useRef<any>();
    const [anchorProfileMenu, setAnchorProfileMenu] =
        React.useState<null | HTMLElement>(null);
    const isProfileMenuOpen = Boolean(anchorProfileMenu);
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(false);
    const [table, setTable] = useRecoilState<any>(tableState);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('top');

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
        await tableAction.getTables();
    }


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
            transformOrigin={{horizontal: "right", vertical: "top"}}
            anchorOrigin={{horizontal: "right", vertical: "bottom"}}
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
                    <Settings fontSize="small"/>
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
                    <Logout fontSize="small"/>
                </ListItemIcon>
                logout
            </MenuItem>
            <Divider/>
            <MenuItem
                sx={{display: "flex", justifyContent: "space-between"}}
                onClick={() => {
                    handleProfileMenuClose();
                }}
            >
                <ListItemIcon>
                    <Brightness7Outlined fontSize="small"/>
                    {/* <Brightness4Outlined fontSize="small" /> */}
                </ListItemIcon>
                <Typography sx={{flexGrow: "1"}}>Appearance</Typography>

                <ListItemIcon sx={{justifyContent: "end"}}>
                    <ArrowForwardIosOutlined fontSize="small"/>
                </ListItemIcon>
            </MenuItem>
            <MenuItem
                sx={{display: "flex"}}
                onClick={() => {
                    handleProfileMenuClose();
                }}
            >
                <ListItemIcon>
                    <GTranslateOutlined/>
                </ListItemIcon>
                <Typography sx={{flexGrow: "1"}}>Language</Typography>
                <ListItemIcon sx={{justifyContent: "end"}}>
                    <ArrowForwardIosOutlined fontSize="small"/>
                </ListItemIcon>
            </MenuItem>
        </Menu>
    );
    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100vh"}}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <Link to="/">
            <img
              className="logo"
              style={{ height: 32, width: 32 }}
              src="https://qy-jz.oss-cn-beijing.aliyuncs.com/jz/%E9%AB%98%E6%B8%85logo%E9%80%8F%E6%98%8E%E5%BA%95%E5%8E%9F%E8%89%B2%E5%AD%97.png"
              alt="logo"
            />
          </Link> */}


                    <Box sx={{flexGrow: 1}}/>

                    {location.pathname === "/" && (
                        <>
                            <Button sx={{fontSize: "1.2rem"}} color="inherit" onClick={showDrawer}>
                                1号
                            </Button>

                            <Box sx={{flexGrow: 1}}/>
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

            <Toolbar/>

            <Box
                component="main"
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    overflow: "auto",
                }}
            >
                <Outlet/>
            </Box>
            <div
                style={{backgroundColor: '#333'}}
                className={'center'}
            >
                <antd.Drawer
                    title="桌号选择"
                    placement={placement}
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    key={placement}
                    height="60%"
                    contentWrapperStyle={{justifyContent: 'center'}}
                >

                    {/*<Box sx={{display: "flex"}}>*/}

                    <antd.Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>

                        <antd.Col span={24}>
                            <antd.Space size={[10, 20]} wrap>
                                {table?.map((item: any) => (
                                    <antd.Button
                                        style={item.isLock === 0 ?
                                            {
                                                color: "rgb(24,144,255)",
                                                backgroundColor: "white",
                                                width: "62.4px",
                                                height: "62.4px",
                                            } : {
                                                width: "62.4px",
                                                height: "62.4px",
                                            }}
                                        type="primary"
                                        size="large"
                                        // 1.如果isLock为1 即已经开台 走调购物车逻辑
                                        // 2.如果isLock为0 即未开台 走调开台逻辑 即锁定该桌号
                                        onClick={item.isLock === 1 ?
                                            () => {
                                            // TODO
                                            }
                                            : () => {
                                                openTableStage.current.tableStageOpen(item);
                                            }}

                                    >{item.tableNum}</antd.Button>
                                    // <Button sx={{ width: "0.5rem", height: "2rem" }} color="info" variant="outlined">{item.tableNum}</Button>
                                ))}
                            </antd.Space>

                        </antd.Col>

                    </antd.Row>


                    {/*</Box>*/}

                </antd.Drawer>
            </div>
            <BottomNavigation/>

            <Paper
                sx={{position: "fixed", bottom: 0, left: 0, right: 0}}
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
                    <BottomNavigationAction label="点餐" icon={<DiningOutlined/>}/>
                    <BottomNavigationAction
                        label="订单"
                        icon={<RoomServiceOutlinedIcon/>}
                    />
                    <BottomNavigationAction label="账单" icon={<RestoreIcon/>}/>
                    <BottomNavigationAction
                        label="报表"
                        icon={<AssignmentOutlinedIcon/>}
                    />
                </BottomNavigation>
            </Paper>
            <OpenTableStage ref={openTableStage}/>
        </Box>
    );
};

export default AppLayout;
