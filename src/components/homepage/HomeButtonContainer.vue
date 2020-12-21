<template>
  <div>
    <div class="box-gray input-container d-fl">
      <input class="box-gray" v-model="searched" placeholder="Enter Room ID"/>
      <img @click="searchRoom" src="@/assets/img/search.svg" />
    </div>
    <div class="d-fl">
      <button class="box-black" @click="createRoom">Create Room</button>
      <button class="box-black" @click="showRooms">Available Rooms</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeButtonContainer',
  data() {
    return {
      searched: '',
    };
  },
  methods: {
    createRoom() {
      const socket = this.$store.getters['socket/getUserSocket'];
      const name = this.$store.getters['auth/getUserName'];
      const roomId = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 6);
      socket.emit('create', {
        roomId,
      });
      socket.emit('join', {
        roomId,
        userName: name,
      });
      this.$router.push(`/playroom/${roomId}`);
    },
    searchRoom() {
      this.$store.getters['socket/getUserSocket'].emit('searchRoom', { roomId: this.searched });
      this.searched = '';
    },
    showRooms() {
      this.$store.getters['socket/getUserSocket'].emit('showRooms');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.d-fl > button:nth-child(2) {
  margin-left: 10px;
}

button:hover {
  @extend .box-white;
}

input {
  width: 100%;
  border: none;
  background: transparent !important;
  padding: 0;
  font-family: $font-regular;
}

input::placeholder {
  font-style: italic;
  color: $white;
  opacity: 0.8;
  text-transform: capitalize;
}

.input-container {
  margin-bottom: 5px;
  padding: 0;
  height: 38px;
}

.input-container img {
  cursor: pointer;
  margin-right: 5px;
}
</style>
