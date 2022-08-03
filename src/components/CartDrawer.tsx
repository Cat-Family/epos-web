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
import useCartActions from "../actions/useCartActions";
import { useRecoilState } from "recoil";
import tablesState from "../state/tablesState";
import tableState from "../state/tableState";
import { useSnackbar } from "notistack";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/joy/Typography";

const CartDrawer = forwardRef((props, ref) => {
  const cartActions = useCartActions();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
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
    if (table !== "未选择") {
      cartActions.getCart(table);
    }
  }, [table, open]);

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
    <>
      <SwipeableDrawer
        anchor="right"
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
        <Box
          p={1}
          minWidth="100vw"
          height="100%"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ flexGrow: 1 }}>test</Box>
          <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 2 }}>
            <Button>下单</Button>
            <Button onClick={() => toggleDrawer(false)}>关闭</Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
});

export default CartDrawer;
