import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import tableState from "../state/tableState";
import cartState from "../state/cartState";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useCartActions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [cart, setCart] = useRecoilState(cartState);
  const [table, setTable] = useRecoilState(tableState);

  /**
   *
   * @param tableNum
   * @returns
   */
  const getCart = async (tableNum: string) => {
    try {
      const res = await axiosInstance.post("/qy/api/sku/querySku", {
        tableNum,
      });

      setCart(res.data.data);

      return res;
    } catch (error: any) {
      return error;
    }
  };

  const postCart = async (props: any) => {
    try {
      const res = await axiosInstance.post("/qy/api/sku/2sku", {
        ...props,
      });

      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const operationSku = async (props: any) => {
    try {
      const res = await axiosInstance.post("/qy/api/sku/operation", {
        ...props,
      });

      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const orderSku = async (tableNum: string) => {
    try {
      const res = await axiosInstance.post(
        "/qy/api/orderMenu/customerOrderMenu",
        {
          tableNum,
        }
      );
      enqueueSnackbar(res.data.message, { variant: "success" });
      return Promise.resolve(res);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
      return Promise.reject(error);
    }
  };

  const checkoutSku = async (tableNum: string) => {
    try {
      const res = await axiosInstance.post(
        "/qy/api/orderMenu/statementOrderMenu",
        {
          tableNum,
        }
      );

      await getCart(tableNum);
      enqueueSnackbar(res.data.message, { variant: "success" });
      setCart({ sku: {} });
      setTable("未选择");
      return Promise.resolve(res);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
      setCart({ sku: {} });
      setTable("未选择");
      return Promise.reject(error);
    }
  };

  const changePs = async (tag: number, orderId: string, tableNum: string) => {
    try {
      const res = await axiosInstance.post("/qy/api/sku/operationPs", {
        orderId,
        tag,
      });

      await getCart(tableNum);

      return Promise.resolve(res);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };
  return { getCart, postCart, operationSku, orderSku, checkoutSku, changePs };
};

export default useCartActions;
