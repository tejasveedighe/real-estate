import axios from "axios";
import { URL } from "./constants";

export const Axios = axios.create({
  baseURL: URL,
  headers: {
    Accept: "*/*"
  }
});
