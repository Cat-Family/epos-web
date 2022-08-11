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
import cartState from "../state/cartState";
import { useSnackbar } from "notistack";
import Typography from "@mui/joy/Typography";
import { List, ListItem } from "@mui/joy";
import { Container } from "@mui/system";
import CartItemCard, { CartItemCardType } from "./CartItemCard";
import Stack from "@mui/material/Stack";

const CartDrawer = forwardRef((props, ref) => {
  const cartActions = useCartActions();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [table, setTable] = useRecoilState(tableState);
  const [cart, setCart] = useRecoilState<any>(cartState);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  /**
   * @des
   * @param open boolean
   * @returns
   */
  const toggleDrawer = (open: boolean) => setOpen(open);

  const handlerOrder = async () => {
    if (table !== "未选择") {
      cartActions.orderSku(table);
    }
  };

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
      closeDrawer() {
        setOpen(false);
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
        sx={{
          zIndex: 1000,
        }}
      >
        <AppBar position="static" sx={{ visibility: "hidden" }}>
          <Toolbar />
        </AppBar>
        <Box
          p={1}
          minWidth="100vw"
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            pb: "80px",
          }}
        >
          <Container
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              alightItems: "center",
            }}
            maxWidth="sm"
          >
            <Typography>{`订单编号：${cart?.sku?.orderId}`}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                m: "auto",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Typography>{`用餐人数：`}</Typography>

              <Button
                onClick={() =>
                  cartActions.changePs(
                    1,
                    cart?.sku?.orderId,
                    cart?.sku?.tableNum
                  )
                }
                variant="plain"
                size="lg"
                color="neutral"
              >
                -
              </Button>

              <Typography fontSize="lg">{cart?.sku?.persons}</Typography>
              <Button
                onClick={() =>
                  cartActions.changePs(
                    0,
                    cart?.sku?.orderId,
                    cart?.sku?.tableNum
                  )
                }
                variant="plain"
                size="lg"
                color="neutral"
              >
                +
              </Button>
            </Box>
            <Stack spacing={2} p={1} sx={{ alignItems: "center" }}>
              {cart?.sku?.cartMessage?.length > 0 &&
                cart?.sku?.cartMessage.map(
                  (item: CartItemCardType, index: number) => (
                    <CartItemCard
                      key={index}
                      productName={item.productName}
                      price={item.price}
                      productNum={item.productNum}
                      dishesInfo={item.dishesInfo}
                      specification={item.specification}
                      cartId={item.cartId}
                      tableNum={cart?.sku?.tableNum}
                    />
                  )
                )}
            </Stack>
            <Box
              sx={{
                display: "flex",
                position: "fixed",
                bottom: 0,
                right: 0,
                left: 0,
                flexDirection: "row-reverse",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }}
              height={45}
              bgcolor="background.paper"
            >
              <Button
                variant="soft"
                onClick={() => {
                  cartActions.checkoutSku(table);
                }}
              >
                结账
              </Button>
              <Button variant="outlined" onClick={handlerOrder}>
                下单
              </Button>
              <Button variant="plain" onClick={() => toggleDrawer(false)}>
                关闭
              </Button>
              <Box flex={1}>
                <Typography>{`合计：${cart?.sku?.totalPrice}￥`}</Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </SwipeableDrawer>
    </>
  );
});

export default CartDrawer;
