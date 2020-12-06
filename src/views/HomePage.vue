<template>
  <div id="home">
    <div id="home-body" class="fl-center">
      <div id="home-body-left">
        <div class="box-gray align-l bold">{{ name }}</div>
        <HomeFriendList />
      </div>
      <div id="home-body-right" class="box-gray">
        <HomeButtonContainer />
        <HomePlayRoomList :rooms="rooms" v-if="rooms.length > 0" />
        <div id="noti" v-else>There is no available room at the moment. Please create one.</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeFriendList from '../components/homepage/HomeFriendList';
import HomeButtonContainer from '../components/homepage/HomeButtonContainer';
import HomePlayRoomList from '../components/homepage/HomePlayRoomList';

export default {
  name: 'HomePage',
  data() {
    return {
      name: null,
      rooms: [],
    };
  },
  components: {
    HomeFriendList,
    HomeButtonContainer,
    HomePlayRoomList,
  },
  created() {
    this.name = this.$store.getters['auth/getUserName'];
    this.$store.dispatch('socket/connect');
    this.$store.getters['socket/getUserSocket'].on('room', (allRooms) => {
      this.rooms = allRooms;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

#home {
  height: 100%;
  width: 100%;
}

#home-body {
  height: 75%;
  margin-top: 7.5%;
  align-items: flex-start;
}

#home-body-left {
  width: 20%;
  height: 100%;
}

#home-body-right {
  width: 40%;
  height: 100%;
  margin-left: 20px;
}

#noti {
  margin-top: 20px;
}

h1 {
  width: 50%;
}
</style>
