import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/joy/Button";
import TextField from "@mui/joy/TextField";
import Avatar from "@mui/joy/Avatar";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Product {
  productName: string;
  dishes: Array<string>;
  productCategoryType: number;
  productItemId: number;
  productPrice: string;
}

const ProductDialog = forwardRef((props, ref) => {
  const { enqueueSnackbar } = useSnackbar();

  const dishesArr: number[] = [];
  const [size, setSize] = useState(16);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkBoxDisable, setCheckBoxDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [portion, setPortion] = useState(1);
  const [value, setValue] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState<Product>({
    productName: "",
    dishes: [],
    productCategoryType: 0,
    productItemId: 0,
    productPrice: "",
  });

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
  const listRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
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
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle minWidth={320}>{productInfo.productName}</DialogTitle>
      <Box
        maxHeight={"50vh"}
        minHeight={"20vh"}
        minWidth={"40vw"}
        id="scroll-dialog"
        ref={descriptionElementRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          p: 2,
          overflow: "auto",
        }}
        tabIndex={-1}
      >
        <FormLabel
          id="storage-label"
          sx={{
            mb: 2,
            fontWeight: "xl",
            textTransform: "uppercase",
            fontSize: "sm",
            letterSpacing: "0.15rem",
          }}
        >
          份数
        </FormLabel>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            size="lg"
            variant="outlined"
            disabled={portion < 1}
            onClick={() => {
              if (portion > 1) {
                setPortion((pre) => pre - 1);
              }
            }}
          >
            -
          </Button>
          <Typography>{portion}</Typography>
          <Button
            size="lg"
            variant="outlined"
            onClick={() => setPortion((pre) => pre + 1)}
          >
            +
          </Button>
        </Box>
        <FormLabel
          id="storage-label"
          sx={{
            mb: 2,
            fontWeight: "xl",
            textTransform: "uppercase",
            fontSize: "sm",
            letterSpacing: "0.15rem",
          }}
        >
          规格
        </FormLabel>
        <RadioGroup
          aria-labelledby="product-size-attribute"
          defaultValue="M"
          sx={{
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {["S", "M", "L"].map((size) => (
            <Sheet
              key={size}
              sx={{
                position: "relative",
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "--joy-focus-outlineOffset": "4px",
                "--joy-palette-focusVisible": (theme) =>
                  theme.vars.palette.neutral.outlinedBorder,
                [`& .${radioClasses.checked}`]: {
                  [`& .${radioClasses.label}`]: {
                    fontWeight: "lg",
                  },
                  [`& .${radioClasses.action}`]: {
                    "--variant-borderWidth": "2px",
                    borderColor: "text.secondary",
                  },
                },
                [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                  outlineWidth: "2px",
                },
              }}
            >
              <Radio
                color="neutral"
                overlay
                disableIcon
                value={size}
                label={size}
                checkedIcon={<CheckCircleRoundedIcon />}
              />
            </Sheet>
          ))}
        </RadioGroup>

        {productInfo.dishes.length > 0 && (
          <>
            <FormLabel
              id="storage-label"
              sx={{
                mb: 2,
                fontWeight: "xl",
                textTransform: "uppercase",
                fontSize: "sm",
                letterSpacing: "0.15rem",
              }}
            >
              双拼
            </FormLabel>
            <Box role="group" p={2}>
              <List
                row
                wrap
                sx={{
                  "--List-gap": "8px",
                  "--List-item-radius": "20px",
                }}
              >
                {productInfo.dishes.map((dish: any, index: number) => (
                  <ListItem key={dish.disheItemId}>
                    <Checkbox
                      overlay
                      disableIcon
                      label={dish.disheName}
                      checked={value.includes(dish.disheItemId)}
                      variant={
                        value.includes(dish.disheItemId) ? "soft" : "outlined"
                      }
                      onChange={(event) => {
                        if (event.target.checked) {
                          if (value.length < 2) {
                            setValue((val) => [...val, dish.disheItemId]);
                          } else {
                            enqueueSnackbar("此为双拼选项", {
                              variant: "warning",
                            });
                          }
                        } else {
                          setValue((val) =>
                            val.filter((text) => text !== dish.disheItemId)
                          );
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )}
      </Box>
      <DialogActions>
        <Button variant="plain" onClick={handleClose}>
          取消
        </Button>
        <Button variant="plain" onClick={handleClose}>
          添加到购物车
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default ProductDialog;
