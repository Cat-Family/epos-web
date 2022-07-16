import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import JSEncrypt from "jsencrypt";

export const baseURL: string = "http://81.70.97.93:8083";

const PUBLICKEY = import.meta.env.PUBLICKEY;
const encrypt = new JSEncrypt();

let refreshToken: string | null = localStorage.getItem("refreshToken");
let accessToken: string | null = localStorage.getItem("accessToken");
let clientId: string | null = localStorage.getItem("clientId");

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    if (accessToken) {
      requestConfig.headers = { authorization: `Bearer ${accessToken}` };
    }
    return requestConfig;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  async (responseConfig: AxiosResponse) => {
    if (responseConfig.data.code === 200) {
      if (
        responseConfig.config.url === "/qy/api/user/loginByUp" &&
        responseConfig.data.data.refreshToken &&
        responseConfig.data.data.accessToken &&
        responseConfig.data.data.clientId
      ) {
        refreshToken = responseConfig.data.data.refreshToken;
        accessToken = responseConfig.data.data.accessToken;
        clientId = responseConfig.data.data.clientId;

        localStorage.setItem("refreshToken", refreshToken as string);
        localStorage.setItem("accessToken", accessToken as string);
        localStorage.setItem("clientId", clientId as string);
      }
      return responseConfig;
    } else if (responseConfig.data.code === 403 && refreshToken && clientId) {
      // refresh Token interceptor
      try {
        encrypt.setPublicKey(PUBLICKEY);
        const sign = encrypt.encrypt(`${clientId},${refreshToken}`);
        const res = await axios.post(`${baseURL}/qy/api/user/session/refresh`, {
          refreshToken,
          clientId,
          sign,
        });
        if (res.data.code === 201) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          accessToken = res.data.data.accessToken;
          refreshToken = res.data.data.refreshToken;
          return axiosInstance.request(responseConfig.config);
        }
        refreshToken = null;
        accessToken = null;
        clientId = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("clientId");
        return Promise.reject(responseConfig.data);
      } catch (error: any) {
        refreshToken = null;
        accessToken = null;
        clientId = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("clientId");
        return Promise.reject(responseConfig.data);
      }
    } else {
      return Promise.reject(responseConfig.data);
    }
  },
  async (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
