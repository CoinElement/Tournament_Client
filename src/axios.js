import axiosOriginObj from "axios";
import store from "./store";

const defaultConfig = {
  baseURL: process.env.VUE_APP_BACKEND_BASE,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
};

const _axios = axiosOriginObj.create(defaultConfig);

_axios.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user.token;
  config.headers.common["User-Name"] = store.state.user.token;
  return config;
});

_axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

export default _axios;
