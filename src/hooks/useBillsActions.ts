import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import billsState from "../state/billsState";

const useBillsActions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [bills, setBills] = useRecoilState(billsState);

  /**
   * @description Get bills action
   * @param params
   * @returns
   */
  const getBills = async (params?: any) => {
    try {
      const response = await axiosInstance.post("/qy/api/sku/hostoryOrder", {
        ...params,
      });
      setBills(response.data.data);
      return Promise.resolve(response);
    } catch (error) {
      setBills(undefined);
      return Promise.reject(error);
    }
  };

  return { getBills };
};

export default useBillsActions;
