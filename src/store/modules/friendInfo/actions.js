export default {
  acceptFriendRequest(context, payload) {
    context.commit('friendAdded', { friendName: payload.friendName });
  },
  removeFriend(context, payload) {
    context.commit('friendRemoved', { friendName: payload.friendName });
  },
};
