/* eslint-disable */
import http from "../../service/httpService";

const apiEndpoint = `${process.env.VUE_APP_API_URL}/api/auth`;
const registerEndpoint = `${process.env.VUE_APP_API_URL}/api/user`;

export default {
  async login(context, payload) {
    const { data: jwt } = await http.post(apiEndpoint, {
      name: payload.name,
      password: payload.password
    });
    // localStorage.setItem(`token ${payload.name}`, jwt);
    context.commit("setToken", { token: jwt });
    context.commit("setName", { name: payload.name });
  },
  async register(context, payload) {
    return await http.post(registerEndpoint, {
      name: payload.name,
      password: payload.password
    });
  },
};
