<template>
  <div id="home">
    <teleport to='body'>
      <transition name="invite-slide">
        <HomeInviteRequest id='invitation' :request="shownRequest" :userName="name"
        v-show="requests.length > 0" @decline="remove()" />
      </transition>
    </teleport>
    <div id="home-body" class="fl-center">
      <div id="home-body-left">
        <div class="box-gray align-l bold">{{ name }}</div>
        <HomeFriendList />
      </div>
      <div id="home-body-right" class="box-gray">
        <HomeButtonContainer />
        <HomePlayRoomList :rooms="rooms" v-if="rooms.length > 0" />
        <div id="noti" v-else>{{message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeFriendList from '../components/homepage/HomeFriendList';
import HomeButtonContainer from '../components/homepage/HomeButtonContainer';
import HomePlayRoomList from '../components/homepage/HomePlayRoomList';
import HomeInviteRequest from '../components/homepage/HomeInviteRequest';

export default {
  name: 'HomePage',
  components: {
    HomeFriendList,
    HomeButtonContainer,
    HomePlayRoomList,
    HomeInviteRequest,
  },
  data() {
    return {
      name: null,
      rooms: [],
      inSearch: false,
      hover: false,
      requests: [],
    };
  },
  computed: {
    message() {
      return (this.inSearch) ? 'There is no match.' : 'There is no available room at the moment. Please create one.';
    },
    shownRequest() {
      if (this.requests.length > 0) {
        return this.requests[0];
      }
      return { inviter: '', roomId: '' };
    },
  },
  watch: {
    requests: {
      deep: true,
      handler(value) {
        if (value.length > 0) {
          setTimeout(() => {
            this.requests.shift();
          }, 10000);
        }
      },
    },
  },
  methods: {
    remove() {
      this.requests.shift();
    },
  },
  mounted() {
    this.name = this.$store.getters['auth/getUserName'];
    this.$store.dispatch('socket/connect');
    this.$store.getters['socket/getUserSocket'].on('room', (allRooms) => {
      this.inSearch = false;
      this.rooms = allRooms;
    });
    this.$store.getters['socket/getUserSocket'].on('searchedRoom', (searchedRooms) => {
      this.inSearch = true;
      this.rooms = searchedRooms;
    });
    this.$store.getters['socket/getUserSocket'].on('invited', (request) => {
      this.requests.push(request);
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

#home {
  height: 100%;
  width: 100%;
  background: url("../assets/img/werewolf.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#invitation {
  @extend .box-gray;
  @extend .fl-between;
  text-align: center;
  width: 30%;
  position: absolute;
  top: 2.5%;
  height: 3%;
}

#home-body {
  height: 75%;
  margin-top: 12vh;
  align-items: flex-start;
}

#home-body-left {
  width: 20%;
  height: 100%;
  box-sizing: border-box;
}

#home-body-right {
  width: 40%;
  height: 100%;
  margin-left: 20px;
  box-sizing: border-box;
}

#noti {
  margin-top: 20px;
}

h1 {
  width: 50%;
}

.invite-slide-enter-active, .invite-slide-leave-active {
  transition: all 0.3s ease;
}

.invite-slide-enter-from, .invite-slide-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
