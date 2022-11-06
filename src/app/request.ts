import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { redirect } from "react-router-dom";

// export const baseURL: string = "http://81.70.97.93";
export const baseURL: string = "https://290b8407y1.oicp.vip";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    return requestConfig;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  async (responseConfig: AxiosResponse) => {
    if (responseConfig.data.code == 10000) {
      if (responseConfig.config.url === "/api/user/userLogin/magicApiJSON.do") {
        if (responseConfig.data.data.loginInfo.authInfo.blackList) {
          return Promise.reject({
            ...responseConfig.data,
            message: "环境异常",
          });
        }
        return Promise.resolve(responseConfig.data);
      }
      return Promise.resolve(responseConfig.data);
    }

    if (responseConfig.data.code == -14444) {
      return Promise.reject(responseConfig.data);
    }
    return Promise.reject(responseConfig.data);
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
