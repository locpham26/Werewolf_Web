export default {
  setSocket(state, payload) {
    state.userSocket = payload.socket;
  },
  setSocketId(state, payload) {
    state.socketId = payload.socketId;
  },
};
