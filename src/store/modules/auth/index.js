/* eslint-disable */
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      userToken: null,
      userName: null
    };
  },
  mutations,
  actions,
  getters
};
