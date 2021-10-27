/* eslint-disable */
import io from "socket.io-client";

export default {
  connect({ commit, rootState }) {
    const socket = io("https://guarded-island-36458.herokuapp.com", {
      withCredentials: true,
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
