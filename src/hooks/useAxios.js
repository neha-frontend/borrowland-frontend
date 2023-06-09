import axios from "../http/index";

const useAxios = () => {
  const accessToken = JSON.parse(sessionStorage.getItem("token"));
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  return axios;
};

export default useAxios;
