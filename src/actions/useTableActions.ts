import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import tablesState from "../state/tablesState";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useTableAction = () => {
  const [tables, setTables] = useRecoilState(tablesState);

  const getTables = async () => {
    try {
      const res = await axiosInstance.get("/qy/api/tables/queryTables");

      setTables(res.data.data.tablesMsg);

      return res;
    } catch (error: any) {
      return error;
    }
  };

  const openStage = async (tableNum: string, persons: number) => {
    try {
      const res = await axiosInstance.post("/qy/api/tables/openStage", {
        tableNum,
        persons,
      });

      return Promise.resolve(res);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  const switchTable = async (
    orderId: string,
    sourceTable: string,
    targetTable: string
  ) => {
    try {
      const res = await axiosInstance.post("/qy/api/sku/changeTable", {
        orderId,
        sourceTable,
        targetTable,
      });

      // setTable(openStage);

      return Promise.resolve(res);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };
  return { getTables, openStage, switchTable };
};

export default useTableAction;
