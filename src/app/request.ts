import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const baseURL: string = "http://localhost";

let refreshToken: string | null = localStorage.getItem("refreshToken");
let accessToken: string | null = localStorage.getItem("accessToken");

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 6000,
})

axiosInstance.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    if (accessToken) {
      requestConfig.headers = { authorization: `Bearer ${accessToken}` }
    }
    return requestConfig;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
)

axiosInstance.interceptors.response.use(
  (responseConfig: AxiosResponse) => {
    return responseConfig
  },
  async (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export default axiosInstance;
