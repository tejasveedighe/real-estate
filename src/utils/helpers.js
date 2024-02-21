import axios from "axios";
import { URL } from "./constants";
import Cookies from "js-cookie";

export const Axios = axios.create({
  baseURL: URL,
});

Axios.interceptors.request.use(
  (config) => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
