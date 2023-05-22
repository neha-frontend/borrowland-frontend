import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_END_POINT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosAdmin;
