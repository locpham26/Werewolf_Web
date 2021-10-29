/* eslint-disable */
import io from "socket.io-client";

export default {
  connect({ commit, rootState }) {
    const socket = io(process.env.VUE_APP_API_URL, {
      // withCredentials: true,
      query: { userName: rootState.auth.userName },
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    socket.on("connect", () => {
      commit("setSocketId", { socketId: socket.id });
    });
    commit("setSocket", { socket });
  }
};
