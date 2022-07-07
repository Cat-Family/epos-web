import React, { useLayoutEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { CardHeader, Grid, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import { Global } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { useRecoilState } from "recoil";
import menuState from "../state/menuState";
import useMenuAction from "../actions/useMenuActions";

const drawerBleeding = 84;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function HomePage(props: Props) {
  const { window } = props;
  const menuAction = useMenuAction();
  const [menu, setMenu] = useRecoilState(menuState);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useLayoutEffect(() => {
    menuAction.getMenu();
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        width: 1,
      }}
    >
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          variant="scrollable"
          allowScrollButtonsMobile={true}
          scrollButtons="auto"
          onChange={handleChange}
          sx={{
            position: "fixed",
            borderRight: 1,
            height: "68%",
            borderColor: "divider",
          }}
        >
          {menu?.map((item: any) => (
            <Tab
              key={item.categoryType}
              label={item.categoryName}
              {...a11yProps(item.categoryType)}
            />
          ))}
        </Tabs>
        <Box sx={{ width: 112 }} />
        <Grid p={1} flexGrow={1} container spacing={2} pb={150}>
          {menu[value]?.products.map((item: any, index: number) => (
            <Grid key={index} item xs={6} sm={6} md={4} lg={3} xl={2}>
              <Card>
                <CardMedia
                  component="img"
                  image={item.productIcon}
                  alt={item.productName}
                />
                <CardHeader
                  subheaderTypographyProps={{ fontSize: ".8em" }}
                  subheader={item.productName}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "fixed", bottom: 86, right: 8 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={82}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            bottom: 100,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
    </Box>
  );
}
