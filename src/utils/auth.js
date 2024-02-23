import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

export function useUserRole() {
  try {
    if (!isLoggedIn()) return null;
    const token = Cookies.get("userToken");
    const decoded = decodeToken(token);
    return decoded?.role;
  } catch (error) {
    return null;
  }
}

export function isLoggedIn() {
  return Cookies.get("userToken") ? true : false;
}
