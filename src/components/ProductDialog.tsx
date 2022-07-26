import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import DialogContentText from "@mui/material/DialogContentText";
import { Box, Typography } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as antd from "antd";
import { withCookies } from "react-cookie";

interface Product {
  productName: string;
  dishes: Array<string>;
  productCategoryType: number;
  productItemId: number;
  productPrice: string;
}

const ProductDialog = forwardRef((props, ref) => {
  const dishesArr: number[] = [];

  const [size, setSize] = useState(16);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkBoxDisable, setCheckBoxDisable] = useState(false);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      // Array.prototype.slice
      //   .call(formGroupRef.current.children)
      //   .map((item) => console.log(item.id));
    }
  });

  return (
    <antd.Modal
      title={productInfo.productName}
      visible={open}
      onOk={handleClose}
      onCancel={handleClose}
      centered
      cancelText="取消"
      okText="下单"
    >
      <DialogContentText tabIndex={-10}>
        基础单价：{productInfo.productPrice} 元/份
      </DialogContentText>
      <br />
      <Box sx={{ display: "flex" }}>
        <antd.Button
          type="primary"
          size="middle"
          disabled={portion <= 1}
          onClick={() => setPortion((pre) => pre - 1)}
        >
          -
        </antd.Button>
        <Typography align="center" sx={{ flexGrow: 1 }}>
          {portion} 份
        </Typography>
        {/* <Button onClick={() => setPortion((pre) => pre + 1)} sx={{ width: "0.5rem", height: "0.5rem" }} color="info" variant="outlined">+</Button> */}
        <antd.Button
          type="primary"
          size="middle"
          onClick={() => setPortion((pre) => pre + 1)}
        >
          +
        </antd.Button>
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
                      // onChange={handleChange}
                      disabled={checkBoxDisable}
                      name={dish.disheName}
                    />
                    //     <antd.Button size="large">{dish.disheName}</antd.Button>
                  }
                  label={dish.disheName}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      )}
    </antd.Modal>
  );
});

export default ProductDialog;
