import { useRecoilState } from "recoil";
import axiosInstance from "../app/request";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

import authAtom from "../state/authState";
import userInfoAtom from "../state/userState";

const userActions = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [auth, setAuth] = useRecoilState(authAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  /**
   *
   * @param storeCode
   * @param userName
   * @param password
   * @returns loginInfo
   */
  const login = async (
    storeCode: string,
    userName: string,
    password: string | false
  ) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/user/userLogin/magicApiJSON.do",
        {
          storeCode,
          userName,
          password,
        }
      );

      setAuth(data.loginInfo.authInfo);
      localStorage.setItem("authInfo", JSON.stringify(data.loginInfo.authInfo));

      enqueueSnackbar("登录成功", { variant: "info" });
      navigate(location.search.replace("?redirect=", "") || "/", {
        replace: true,
      });
      return data.loginInfo;
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.message || "Network error", { variant: "error" });
      return error;
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/user/userInfo/magicApiJSON.do",
        {
          authInfo: {
            ...JSON.parse(localStorage.getItem("authInfo") as string),
            reqTime: new Date().getTime(),
            reqUid: CryptoJS.MD5(
              new Date().getTime() + auth.tenantId + auth.userName
            ).toString(),
          },
        }
      );

      setUserInfo(data.userInfo);
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo));

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const loginOut = async () => {
    try {
      // await axiosInstance.post("/qy/api/user/loginOut");
      localStorage.removeItem("authInfo");
      localStorage.removeItem("userInfo");

      setUserInfo(null);
      setAuth(null);
    } catch (error: any) {
      return error;
    }
  };

  return { login, loginOut, getUser };
};

export default userActions;
