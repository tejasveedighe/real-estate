import axios from "axios";
import { URL } from "./constants";

export const Axios = axios.create({
  baseURL: URL,
});

Axios.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
