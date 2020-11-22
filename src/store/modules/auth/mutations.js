export default {
  setToken(state, payload) {
    state.userToken = payload.token;
  },
  setName(state, payload) {
    state.userName = payload.name;
  },
};
