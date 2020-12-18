import axiosOriginObj from "axios";
import store from "./store";

console.log(store.state);

const defaultConfig = {
  baseURL: process.env.VUE_APP_BACKEND_BASE,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: store.state.user.token
  }
};

const _axios = axiosOriginObj.create(defaultConfig);

export default _axios;
