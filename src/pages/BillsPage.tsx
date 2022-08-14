import React, { useLayoutEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useBillsActions from "../actions/useBillsActions";
import { useRecoilState } from "recoil";
import billsState from "../state/billsState";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import JoyLink from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Container from "@mui/material/Container";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/joy/Chip";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import set from "date-fns/set";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

function BillsPage() {
  const billsActions = useBillsActions();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [bills, setBills] = useRecoilState<any>(billsState);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [data, setData] = useState<any>();

  const [value, setValue] = React.useState<Date>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue as Date);
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
    {
      setLoading(true);
      billsActions
        .getBills({
          startTime: set(value, {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 1,
          }).toLocaleString(),
          endTime: set(value, {
            hours: 23,
            minutes: 59,
            seconds: 59,
            milliseconds: 59,
          }).toLocaleString(),
        })
        .finally(() => setLoading(false));
    }
  }, [value]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        width: 1,
      }}
    >
      <Container maxWidth="sm">
        <Typography ml={2} pb={2} pt={2} fontSize="lg">
          合计:{bills?.receivable || 0}元 实收:{bills?.receipts || 0}元
        </Typography>
        <Box
          pt={2}
          pb={2}
          ml={2}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <MobileDatePicker
            label="日期"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography>的账单：</Typography>
        </Box>

        <Divider />
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {!loading && !bills?.historyOrder && (
          <Typography>此日账单数据为空</Typography>
        )}
        {!loading &&
          bills?.historyOrder &&
          bills?.historyOrder?.map((bill: any) => (
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
                  </Typography>{" "}
                  <Typography
                    fontSize="sm"
                    aria-describedby="card-description"
                    mb={1}
                    sx={{ color: "text.tertiary" }}
                  >
                    实收 {bill.receiptsPrice}￥
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
                      {bill.createTime.split(" ")[0]}
                    </Typography>
                    <Typography fontSize="lg">
                      {bill.createTime.split(" ")[1]}
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
                key={item.cartId}
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
