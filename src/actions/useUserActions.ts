import { useRecoilState } from "recoil";
import axiosInstance from "../app/request";
import authAtom from "../state/authState";

const userActions = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

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
      return res;
    } catch (error) {
      return error;
    }
  };

  return { login };
};

export default userActions;
