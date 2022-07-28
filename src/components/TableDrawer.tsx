import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import Box from "@mui/joy/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/joy/Button";
import AppBar from "@mui/material/AppBar/AppBar";
import { Toolbar } from "@mui/material";
import useTableAction from "../actions/useTableActions";
import { useRecoilState } from "recoil";
import tablesState from "../state/tablesState";
import tableState from "../state/tableState";
import { useSnackbar } from "notistack";

const TableDrawer = forwardRef((props, ref) => {
  const tableActions = useTableAction();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [tables, setTables] = useRecoilState(tablesState);
  const [table, setTable] = useRecoilState(tableState);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  /**
   * @des
   * @param open boolean
   * @returns
   */
  const toggleDrawer = (open: boolean) => setOpen(open);

  useLayoutEffect(() => {
    tableActions.getTables();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      toggleDrawer() {
        setOpen((pre) => !pre);
      },
    }),
    []
  );

  return (
    <SwipeableDrawer
      anchor="top"
      variant="temporary"
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      sx={{ zIndex: 1000 }}
    >
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      <Box minHeight={100} maxHeight={240} p={1}>
        {tables.length > 0 &&
          tables.map((item: any, index: number) => (
            <Button
              key={index}
              variant={item.isLock === 0 ? "outlined" : "soft"}
              sx={{ width: 45, m: 1 }}
              onClick={() => {
                if (item.tableNum === table) {
                  enqueueSnackbar("重复选择餐桌", { variant: "warning" });
                } else {
                  if (item.isLock === 0) {
                  } else {
                    setTable(item.tableNum);
                    toggleDrawer(false);
                  }
                }
              }}
            >
              {item.tableNum}
            </Button>
          ))}
      </Box>
    </SwipeableDrawer>
  );
});

export default TableDrawer;
