<template>
  <div class="room-list-container" >
    <div class="d-fl">
      <p>Room</p>
      <p>Player</p>
    </div>
    <div class="home-room-container">
      <div v-for="room in rooms" class="box-white fl-center" :key="room.id">
        <p>{{ room.id }}</p>
        <p>{{ room.playerList.length }}/12</p>
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
  height: 100%;
}

.d-fl p:nth-child(2){
  margin-left: calc(50% - 39px - 21.5px);
}

.d-fl p {
  margin-top: 15px;
  margin-bottom: 10px;
  font-family: $font-bold;
}

.box-white {
  justify-content: space-between;
  margin-top: 5px;
  padding-top: 0;
  padding-bottom: 0;
}

button:hover {
  background-color: $gray;
}

.home-room-container {
  max-height: calc(100% - 129px);
  overflow-y: hidden;
}

.home-room-container p:nth-child(2) {
  padding-left: 33px;
}

</style>
