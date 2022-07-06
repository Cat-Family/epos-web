import { useRecoilState } from "recoil";
import axiosInstance from "../app/request";
import authAtom from "../state/authState";
import { useSnackbar } from "notistack";

const userActions = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const { enqueueSnackbar } = useSnackbar();

  const login = async (
    storeCode: string,
    userName: string,
    password: string,
    randomKey: string
  ) => {
    try {
      const res = await axiosInstance.post("/qy/api/user/loginByUp", {
        storeCode,
        userName,
        password,
        randomKey,
      });
      setAuth(res.data);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      enqueueSnackbar("登录成功", { variant: "success" });

      return res;
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
      return error;
    }
  };

  return { login };
};

export default userActions;
