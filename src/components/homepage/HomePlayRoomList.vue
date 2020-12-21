<template>
  <div class="room-list-container" >
    <div class="d-fl">
      <p>Room</p>
      <p>Player</p>
    </div>
    <div class="home-room-container">
      <div v-for="room in rooms" class="box-white fl-center" :key="room.id">
        <p class="home-room-container-item">{{ room.id }}</p>
        <p class="home-room-container-item">{{ room.playerList.length }}/12</p>
        <button class="box-black" @click="joinRoom(room.id)">Join</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePlayRoomList',
  props: ['rooms'],
  methods: {
    joinRoom(roomId) {
      const socket = this.$store.getters['socket/getUserSocket'];
      const name = this.$store.getters['auth/getUserName'];
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

.room-list-container {
  width: 100%;
  height: 470px;
}

.d-fl p:first-child {
  padding-left: 10px;
  width: calc(33% + 10px);
}

.d-fl p:nth-child(2){
  text-align: center;
  margin-right: calc(33% + 10px);
}

.d-fl p {
  width: 33%;
  margin-top: 15px;
  margin-bottom: 10px;
  font-family: $font-bold;
}

.box-white {
  justify-content: space-between;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.box-white p {
  margin-left: 0;
  margin-right: 0;
}

button:hover {
  background-color: $gray;
}

.home-room-container {
  max-height: calc(100% - 129px);
  overflow-y: hidden;
}

.home-room-container-item {
  width: 33%;
}

</style>
