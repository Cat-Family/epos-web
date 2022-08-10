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
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/joy/Typography";

const TableDrawer = forwardRef((props, ref) => {
  const tableActions = useTableAction();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openStage, setOpenStage] = useState<string>("");
  const [toll, setToll] = useState<number>(1);
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

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleStageOpen = async () => {
    setLoading(true);
    try {
      await tableActions.openStage(openStage, toll);
      setTable(openStage);
      handleStageClose();
      toggleDrawer(false);
      enqueueSnackbar("开台成功", { variant: "success" });
      setLoading(false);
      return;
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
      return;
    }
  };

  const handleStageClose = () => {
    setDialogOpen(false);
    setToll(1);
  };

  useLayoutEffect(() => {
    tableActions.getTables();
  }, [table, open]);

  useImperativeHandle(
    ref,
    () => ({
      toggleDrawer() {
        setOpen((pre) => !pre);
      },
      closeDrawer() {
        setOpen(false);
      },
    }),
    []
  );

  return (
    <>
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
        <Box minHeight={100} maxHeight={340}>
          <Box bgcolor="background.paper" p={1}>
            {tables.length > 0 &&
              tables.map((item: any, index: number) => (
                <Button
                  key={index}
                  variant={item.isLock === 0 ? "outlined" : "soft"}
                  sx={{ width: 58, m: 1, height: 50 }}
                  onClick={() => {
                    if (item.tableNum === table) {
                      enqueueSnackbar("重复选择餐桌", { variant: "warning" });
                    } else {
                      if (item.isLock === 0) {
                        setOpenStage(item.tableNum);
                        handleClickOpen();
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
        </Box>
      </SwipeableDrawer>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={dialogOpen}
        onClose={handleStageClose}
      >
        <DialogTitle>{`开台: ${openStage} 号桌`}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              m: "auto",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              variant="plain"
              size="lg"
              onClick={() => setToll((pre) => pre - 1)}
              disabled={toll <= 1}
            >
              -
            </Button>
            <Typography fontSize="lg">{toll}</Typography>
            <Button
              variant="plain"
              onClick={() => setToll((pre) => pre + 1)}
              size="lg"
            >
              +
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="plain" onClick={handleStageClose}>
            取消
          </Button>
          <Button variant="plain" onClick={handleStageOpen}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default TableDrawer;
