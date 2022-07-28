import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import menuState from "../state/menuState";
import useMenuAction from "../actions/useMenuActions";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProductDialog from "../components/ProductDialog";
import Skeleton from "@mui/material/Skeleton";
import JoyButton from "@mui/joy/Button";
import tableState from "../state/tableState";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function HomePage() {
  const menuAction = useMenuAction();
  const productDialog = useRef<any>();
  const [menu, setMenu] = useRecoilState<any>(menuState);
  const [value, setValue] = useState<string>("");
  const [table, setTable] = useRecoilState(tableState);

  useLayoutEffect(() => {
    menuAction.getMenu();
  }, []);

  useLayoutEffect(() => {
    if (menu[0]?.categoryType) {
      setValue(menu[0].categoryType.toString());
    }
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
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ width: "100vw", display: "flex" }}>
        {value ? (
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
                    value={item.categoryType.toString()}
                  />
                ))}
              </TabList>
            </Box>
            <Box sx={{ flexGrow: 1, pl: "5rem" }}>
              {menu?.map((item: any) => (
                <TabPanel
                  sx={{ pr: 0 }}
                  key={item.categoryType}
                  value={item.categoryType.toString()}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {item?.products.map((item: any) => (
                      <JoyButton
                        key={item.productItemId}
                        disabled={table === "未选择"}
                        title={
                          table === "未选择"
                            ? "请选择需要点餐餐桌"
                            : item.productName
                        }
                        color="neutral"
                        variant="outlined"
                        onClick={() => {
                          productDialog.current.productDialogOpen(item);
                        }}
                        sx={{ width: "8rem", height: "4rem" }}
                      >
                        {item.productName}
                      </JoyButton>
                    ))}
                  </Box>
                </TabPanel>
              ))}
            </Box>
          </TabContext>
        ) : (
          <>
            <Box
              sx={{
                height: 1,
                position: "fixed",
                borderRight: 1,
                borderColor: "divider",
              }}
            >
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Box>
            <Box sx={{ flexGrow: 1, pl: "5rem" }}>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Box>
          </>
        )}
      </Box>
      <ProductDialog ref={productDialog} />
    </Box>
  );
}
