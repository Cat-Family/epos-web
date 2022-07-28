import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/joy/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useSetRecoilState } from "recoil";
import AppBar from "@mui/material/AppBar/AppBar";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import useTableAction from "../actions/useTableActions";
import { useRecoilState } from "recoil";
import tableState from "../state/tableState";

const TableDrawer = forwardRef((props, ref) => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [open, setOpen] = useState<boolean>(false);
  const [tables, setTables] = useRecoilState(tableState);

  const toggleDrawer = (open: boolean) => setOpen(open);

  const tableActions = useTableAction();

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
            >
              {item.tableNum}
            </Button>
          ))}
      </Box>
    </SwipeableDrawer>
  );
});

export default TableDrawer;
