/* eslint-disable */
import { apiUrl, apiUrl2 } from "../../service/config.json";
import http from "../../service/httpService";

const apiEndpoint = `${apiUrl}/auth`;
const registerEndpoint = `${apiUrl}/user`;
const apiEndpoint2 = `${apiUrl2}/auth/email/verify-email`;

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
  async sendRegisterEmail(context, payload) {
    await http.post(apiEndpoint2, {
      email: payload.email
    });
    context.commit("setEmail", { name: payload.name });
  }
};
