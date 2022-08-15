import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import tablesState from "../state/tablesState";
import tableState from "../state/tableState";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useTableAction = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [tables, setTables] = useRecoilState(tablesState);
  const [table, setTable] = useRecoilState(tableState);

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
      enqueueSnackbar(res.data.message, { variant: "success" });
      return Promise.resolve(res);
    } catch (error: any) {
      enqueueSnackbar(error.data.message || error.message, {
        variant: "error",
      });
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
      setTable(targetTable);
      enqueueSnackbar(res.data.message, { variant: "success" });
      return Promise.resolve(res);
    } catch (error: any) {
      enqueueSnackbar(error.data.message || error.message, {
        variant: "error",
      });
      return Promise.reject(error);
    }
  };
  return { getTables, openStage, switchTable };
};

export default useTableAction;
