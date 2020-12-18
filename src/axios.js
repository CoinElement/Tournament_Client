import axiosOriginObj from "axios";
import store from "./store";

const defaultConfig = {
  baseURL: process.env.VUE_APP_BACKEND_BASE,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: store.state.user.token,
    "User-Name": store.state.user.token
  }
};

const _axios = axiosOriginObj.create(defaultConfig);

_axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response);
    }
  }
);

export default _axios;
