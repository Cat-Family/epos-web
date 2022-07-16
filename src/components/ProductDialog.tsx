import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
interface Product {
  productName: string;
  dishes: Array<string>;
  productCategoryType: number;
  productItemId: number;
  productPrice: string;
}

const ProductDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [portion, setPortion] = useState(1);
  const [productInfo, setProductInfo] = useState<Product>({
    productName: "",
    dishes: [],
    productCategoryType: 0,
    productItemId: 0,
    productPrice: "",
  });
  // const [state, setState] = useState();

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({
  //     // ...state,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  useImperativeHandle(ref, () => ({
    productDialogOpen(props: Product) {
      setProductInfo(props);
      setOpen(true);
    },

    productDialogClose() {
      handleClose();
    },
  }));
  const handleClose = () => {
    setOpen(false);
    setPortion(1);
    setProductInfo({
      productName: "",
      dishes: [],
      productCategoryType: 0,
      productItemId: 0,
      productPrice: "",
    });
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const formGroupRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (formGroupRef.current) {
      Array.prototype.slice
        .call(formGroupRef.current.children)
        .map((item) => console.log(item.id));
    }
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      maxWidth="sm"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        {productInfo.productName}
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText tabIndex={-1}>
          单价: {productInfo.productPrice} 元/份
        </DialogContentText>
        <Box sx={{ display: "flex" }}>
          <Button
            disabled={portion <= 1}
            onClick={() => setPortion((pre) => pre - 1)}
          >
            -
          </Button>
          <Typography align="center" sx={{ flexGrow: 1 }}>
            {portion} 份
          </Typography>
          <Button onClick={() => setPortion((pre) => pre + 1)}>+</Button>
        </Box>
        {productInfo.dishes.length > 0 && (
          <Box
            maxHeight={240}
            id="scroll-dialog"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <FormControl
              required
              // error={error}
              component="fieldset"
              sx={{ m: 3 }}
              variant="standard"
            >
              <FormLabel component="legend">多选二</FormLabel>
              <FormGroup row={true} ref={formGroupRef}>
                {productInfo.dishes.map((dish: any) => (
                  <FormControlLabel
                    key={dish.disheItemId}
                    id={dish.disheItemId}
                    control={
                      <Checkbox
                        // checked={gilad}
                        // onChange={handleChange}
                        name={dish.disheName}
                      />
                    }
                    label={dish.disheName}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleClose}>添加到购物车</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ProductDialog;
