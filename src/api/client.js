import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://qstnr.intvw.logodiffusion.com/api/",
});

export default axiosInstance;
