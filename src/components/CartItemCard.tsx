import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";

const CartItemCard = ({
  productName,
  price,
  productNum,
  dishesInfo,
  specification,
}) => {
  return (
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
            <Button variant="plain" size="lg">
              -
            </Button>
            <Typography fontSize="lg">{productNum}</Typography>
            <Button variant="plain" size="lg">
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
          sx={{ fontWeight: "md", color: "text.secondary" }}
          onClick={() => {
            console.log("删除");
          }}
        >
          删除
        </Typography>
      </CardOverflow>
    </Card>
  );
};

export default CartItemCard;
