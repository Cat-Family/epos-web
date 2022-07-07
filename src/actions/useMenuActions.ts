import axiosInstance from "../app/request";
import { useRecoilState } from "recoil";
import menuState from "../state/menuState";

const useMenuAction = () => {
  const [menu, setMenu] = useRecoilState(menuState);
  const getMenu = async () => {
    try {
      const res = await axiosInstance.get("/qy/api/menuItems/queryMenuItems");

      setMenu(res.data.data.menuItems);

      return res;
    } catch (error: any) {
      return error;
    }
  };

  return { getMenu };
};

export default useMenuAction;
