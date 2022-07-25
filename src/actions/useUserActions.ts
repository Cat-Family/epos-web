import { useRecoilState } from "recoil";
import axiosInstance from "../app/request";
import authAtom from "../state/authState";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {message} from 'antd';

const userActions = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();


  /**
   *
   * @param storeCode
   * @param username
   * @param password
   * @returns accessToken, refreshToken
   */
  const login = async (
    storeCode: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await axiosInstance.post("/qy/api/user/loginByUp", {
        storeCode,
        username,
        password,
      });
      setAuth(res.data);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("clientId", res.data.data.clientId);
      // enqueueSnackbar("登录成功", { variant: "info",anchorOrigin:{horizontal: "center", vertical: "top"}});
      navigate(location.search.replace("?redirect=", "") || "/", {
        replace: true,
      });
      return res;
    } catch (error: any) {
      // enqueueSnackbar(error.message, { variant: "error",anchorOrigin:{horizontal: "center", vertical: "top"}});
      message.error(error.message);
      return error;
    }
  };


  const loginOut = async () => {
    try {
      await axiosInstance.post("/qy/api/user/loginOut");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("clientId");
    } catch (error: any) {
      // enqueueSnackbar(error.message, { variant: "error",anchorOrigin:{horizontal: "center", vertical: "top"}});
      message.error(error.message);
      return error;
    }
  };

  return { login,loginOut };
};

export default userActions;
