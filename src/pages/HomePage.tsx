import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { CardHeader, Container, Grid, IconButton, Stack } from "@mui/material";
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
import { TabContext, TabList, TabPanel } from "@mui/lab";

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
  const [menu, setMenu] = useRecoilState<any>(menuState);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useLayoutEffect(() => {
    menuAction.getMenu();
  }, []);

  useEffect(() => {
    if (menu.length > 0) setValue(menu[0]?.categoryType);
  }, [menu]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
      <Box sx={{ width: "100vw", typography: "body1", display: "flex" }}>
        <TabContext value={value}>
          <Box sx={{ height: 1, position: "fixed" }}>
            <TabList
              orientation="vertical"
              value={value}
              variant="scrollable"
              allowScrollButtonsMobile={true}
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="tabs"
            >
              {menu?.map((item: any) => (
                <Tab
                  key={item.categoryType}
                  label={item.categoryName}
                  value={item.categoryType}
                />
              ))}
            </TabList>
          </Box>
          <Box sx={{ flexGrow: 1, pl: "4rem" }}>
            {menu?.map((item: any) => (
              <TabPanel value={item.categoryType}>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {item?.products.map((item: any, index: number) => (
                    <Card sx={{ width: "8rem" }} key={index}>
                      <CardHeader
                        subheaderTypographyProps={{ fontSize: ".8em" }}
                        subheader={item.productName}
                      />
                    </Card>
                  ))}
                </Container>
              </TabPanel>
            ))}
          </Box>
        </TabContext>
      </Box>

      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "fixed", bottom: 60, right: 8 }}
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
    </Box>
  );
}
