import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import tableState from "../state/tableState";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useTableAction = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [table, setTable] = useRecoilState(tableState);
    /**
     *
     * @returns menu
     */
    const getTables = async () => {
        try {
            const res = await axiosInstance.get("/qy/api/tables/queryTables");

            setTable(res.data.data.tablesMsg);

            return res;
        } catch (error: any) {
            message.error(error.message);
            if (error.code === 401) {
                navigate("/users/signin", { replace: true });
            }
            return error;
        }
    };

    return { getTables };
};

export default useTableAction;
