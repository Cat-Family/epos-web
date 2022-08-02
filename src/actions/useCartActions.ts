import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import cartState from "../state/cartState";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useCartActions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [cart, setCart] = useRecoilState(cartState);

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

      setCart(res.data.data.menuItems);

      return res;
    } catch (error: any) {
      // enqueueSnackbar(error.message, { variant: "error" });
      return error;
    }
  };

  return { getCart };
};

export default useCartActions;
