import React, { useEffect, useLayoutEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import menuState from "../state/menuState";
import useMenuAction from "../actions/useMenuActions";
import { TabContext, TabList, TabPanel } from "@mui/lab";

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

export default function HomePage() {
  const menuAction = useMenuAction();
  const [menu, setMenu] = useRecoilState<any>(menuState);
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    menuAction.getMenu();
  }, []);

  useEffect(() => {
    if (menu.length > 0) setValue(menu[0]?.categoryType);
  }, [menu]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        width: 1,
      }}
    >
      <Box sx={{ width: "100vw", display: "flex" }}>
        <TabContext value={value}>
          <Box
            sx={{
              height: 1,
              position: "fixed",
              borderRight: 1,
              borderColor: "divider",
            }}
          >
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
          <Box sx={{ flexGrow: 1, pl: "5rem" }}>
            {menu?.map((item: any) => (
              <TabPanel sx={{ pr: 0 }} value={item.categoryType}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {item?.products.map((item: any) => (
                    <Button
                      color="info"
                      variant="outlined"
                      sx={{ width: "8rem", height: "4rem" }}
                    >
                      {item.productName}
                    </Button>
                  ))}
                </Box>
              </TabPanel>
            ))}
          </Box>
        </TabContext>
      </Box>

      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "fixed", bottom: 60, right: 4 }}
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
