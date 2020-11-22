import io from 'socket.io-client';

export default {
  connect({ commit }) {
    const socket = io('localhost:3001');
    socket.on('connect', () => {
      commit('setSocketId', { socketId: socket.id });
    });
    commit('setSocket', { socket });
  },
};
