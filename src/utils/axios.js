import axios from "axios";
require("dotenv").config();

const axiosApiIntances = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

axiosApiIntances.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApiIntances.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      localStorage.clear();
      alert("Please log in !");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosApiIntances;
