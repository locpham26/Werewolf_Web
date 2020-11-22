export default {
  getUserToken(state) {
    return state.userToken;
  },
  getUserName(state) {
    return state.userName;
  },
  isAuthenticated(state) {
    return !!state.userToken;
  },
};
