import axiosInstance from "../app/request";
import { message } from 'antd';

const loginOutActions = () => {

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

    return { loginOut };
};

export default loginOutActions;
