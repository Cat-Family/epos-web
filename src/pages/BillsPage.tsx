import React, { useLayoutEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useLocation, Link } from "react-router-dom";
import useBillsActions from "../actions/useBillsActions";
import { useRecoilState } from "recoil";
import billsState from "../state/billsState";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import JoyLink from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Container from "@mui/material/Container";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/joy/Stack";
import CartItemCard, { CartItemCardType } from "../components/CartItemCard";
import Chip from "@mui/joy/Chip";

function BillsPage() {
  const billsActions = useBillsActions();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [bills, setBills] = useRecoilState<any>(billsState);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [data, setData] = useState<any>();

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    location.hash = "/";
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useLayoutEffect(() => {
    billsActions.getBills({
      startTime: "2021-08-13T09:19:39.140Z",
      endTime: "2022-08-13T09:19:39.140Z",
    });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        width: 1,
      }}
    >
      <Container maxWidth="sm">
        {bills &&
          bills?.map((bill: any) => (
            <Card
              key={bill.orderId}
              variant="outlined"
              row={false}
              sx={{
                gap: 2,
                m: 2,
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ ml: 0.5, flex: 1 }}>
                  <Typography
                    level="h2"
                    fontSize="lg"
                    id="card-description"
                    mb={0.5}
                  >
                    {bill.tableNum}桌
                  </Typography>
                  <Typography
                    fontSize="sm"
                    aria-describedby="card-description"
                    mb={1}
                    sx={{ color: "text.tertiary" }}
                  >
                    合计 {bill.totalPrice}￥
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      m: "auto",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontSize="lg">
                      {new Date(bill.createTime).toLocaleDateString()}
                    </Typography>
                    <Typography fontSize="lg">
                      {new Date(bill.createTime).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <JoyLink
                overlay
                underline="none"
                onClick={() => {
                  setData(bill);
                  setOpen(true);
                }}
                sx={{ color: "text.tertiary" }}
              />
              <CardOverflow
                variant="soft"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  py: 1.5,
                  px: "var(--Card-padding)",
                  borderTop: "1px solid",
                  borderColor: "neutral.outlinedBorder",
                  bgcolor: "background.level1",
                }}
              >
                <Typography
                  level="body3"
                  sx={{ fontWeight: "md", color: "text.secondary", flex: 1 }}
                >
                  订单号 {bill.orderId}
                </Typography>
                <Box sx={{ width: 2, bgcolor: "divider" }} />
                <Typography
                  level="body3"
                  sx={{
                    fontWeight: "md",
                    color: "text.secondary",
                  }}
                >
                  {bill.persons} 人
                </Typography>
              </CardOverflow>
            </Card>
          ))}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" minWidth={280}>
          {data?.orderId} 菜单
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          sx={{
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {data?.cartMessage?.length > 0 &&
            data.cartMessage.map((item: any, index: number) => (
              <Card
                variant="outlined"
                row={false}
                sx={{
                  width: "90%",
                  gap: 2,
                  "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ ml: 0.5, flex: 1 }}>
                    <Typography
                      level="h2"
                      fontSize="lg"
                      id="card-description"
                      mb={0.5}
                    >
                      {item.productName}
                    </Typography>
                    {item.dishesInfo && (
                      <Typography
                        fontSize="sm"
                        aria-describedby="card-description"
                        mb={1}
                        sx={{ color: "text.tertiary" }}
                      >
                        {item.dishesInfo}
                      </Typography>
                    )}
                    {item.specification && (
                      <Chip
                        variant="outlined"
                        color="primary"
                        size="sm"
                        sx={{ pointerEvents: "none" }}
                      >
                        {item.specification}
                      </Chip>
                    )}
                  </Box>
                </Box>

                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlinedBorder",
                    bgcolor: "background.level1",
                  }}
                >
                  <Typography
                    level="body3"
                    sx={{ fontWeight: "md", color: "text.secondary", flex: 1 }}
                  >
                    {item?.price}￥
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "text.secondary",
                      cursor: "pointer",
                    }}
                  >
                    {item?.productNum}份
                  </Typography>
                </CardOverflow>
              </Card>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>关闭</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BillsPage;
