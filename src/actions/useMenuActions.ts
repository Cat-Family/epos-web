import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import menuState from "../state/menuState";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useMenuAction = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [menu, setMenu] = useRecoilState(menuState);
  /**
   *
   * @returns menu
   */
  const getMenu = async () => {
    try {
      const res = await axiosInstance.get("/qy/api/menuItems/queryMenuItems");

      setMenu(res.data.data.menuItems);

      return res;
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
      if (error.code === 401) {
        navigate("/users/signin", { replace: true });
      }
      return error;
    }
  };

  return { getMenu };
};

export default useMenuAction;
