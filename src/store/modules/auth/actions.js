import { apiUrl } from '../../service/config.json';
import http from '../../service/httpService';

const apiEndpoint = `${apiUrl}/auth`;

export default {
  async login(context, payload) {
    const { data: jwt } = await http.post(apiEndpoint, {
      name: payload.name,
      password: payload.password,
    });
    // localStorage.setItem(`token ${payload.name}`, jwt);
    context.commit('setToken', { token: jwt });
    context.commit('setName', { name: payload.name });
  },
};