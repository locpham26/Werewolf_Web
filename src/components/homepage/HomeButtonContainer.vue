<template>
  <div>
    <div class="d-fl">
      <button class="box-black" @click="createRoom">Create Room</button>
      <button class="box-black">Available Rooms</button>
      <div class="box-gray input-container d-fl">
        <input class="box-gray" placeholder="Enter Room ID"/>
        <img src="@/assets/img/search.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeButtonContainer',
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
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.d-fl > button:nth-child(2) {
  margin-left: 10px;
}

button:hover {
  background-color: $light;
  color: $black;
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
  width: 50%;
  margin-left: auto;
  padding: 0;
  height: 38px;
}

.input-container img {
  margin-right: 5px;
}
</style>
