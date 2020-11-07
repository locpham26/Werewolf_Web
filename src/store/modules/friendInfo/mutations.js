export default {
  friendAdded(state, payload) {
    state.friendList.push({ name: payload.friendName });
  },
  friendRemoved(state, payload) {
    state.friendList = state.friendList.filter((friend) => friend.name !== payload.friendName);
    console.log('remove');
    console.log(state.friendList);
  },
};
