import io from 'socket.io-client';

export default {
  connect({ commit, rootState }) {
    const socket = io('localhost:3001', {
      withCredentials: true,
      query: { userName: rootState.auth.userName },
    });
    socket.on('connect', () => {
      commit('setSocketId', { socketId: socket.id });
    });
    commit('setSocket', { socket });
  },
};
