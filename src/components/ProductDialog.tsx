import React, { FC, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Product {
  productName: string;
  dishes: Array<string>;
  productCategoryType: number;
  productItemId: number;
  producPrice: string;
}

const ProductDialog = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [productInfo, setProductInfo] = React.useState<Product>({
    productName: "",
    dishes: [],
    productCategoryType: 0,
    productItemId: 0,
    producPrice: "",
  });

  useImperativeHandle(ref, () => ({
    productDialogOpen(props: Product) {
      setProductInfo(props);
      setOpen(true);
    },

    productDialogClose() {
      setOpen(false);
    },
  }));
  const handleClose = () => {
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
        <DialogContentText
          sx={{ height: 200 }}
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ProductDialog;
