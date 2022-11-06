import React, { FC, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import useCartActions from "../hooks/useCartActions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";

export type CartItemCardType = {
  cartId: number;
  productName: string;
  price: string;
  productNum: number;
  dishesInfo: string;
  specification: string;
  tableNum: string;
};

const CartItemCard: FC<CartItemCardType> = ({
  cartId,
  productName,
  price,
  productNum,
  dishesInfo,
  specification,
  tableNum,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const cartActions = useCartActions();
  const [loading, setLoading] = useState<boolean>(false);

  const operationSku = async (cartId: number, tag: number) => {
    setLoading(true);
    try {
      const res = await cartActions.operationSku({
        cartId: cartId,
        tag: tag,
      });
      await cartActions.getCart(tableNum);
      setLoading(false);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  };
  return (
    <>
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
            <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
              {productName}
            </Typography>
            {dishesInfo && (
              <Typography
                fontSize="sm"
                aria-describedby="card-description"
                mb={1}
                sx={{ color: "text.tertiary" }}
              >
                {dishesInfo}
              </Typography>
            )}
            {specification && (
              <Chip
                variant="outlined"
                color="primary"
                size="sm"
                sx={{ pointerEvents: "none" }}
              >
                {specification}
              </Chip>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                color="neutral"
                onClick={() => operationSku(cartId, 1)}
              >
                -
              </Button>
              <Typography fontSize="lg">{productNum}</Typography>
              <Button
                variant="plain"
                size="lg"
                color="neutral"
                onClick={() => operationSku(cartId, 0)}
              >
                +
              </Button>
            </Box>
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
            {price}￥
          </Typography>
          <Box sx={{ width: 2, bgcolor: "divider" }} />
          <Typography
            level="body3"
            sx={{
              fontWeight: "md",
              color: "text.secondary",
              cursor: "pointer",
            }}
            onClick={() => operationSku(cartId, 2)}
          >
            删除
          </Typography>
        </CardOverflow>
      </Card>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0,0,0, 0.1)",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CartItemCard;
