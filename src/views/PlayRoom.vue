<template>
<div class="playroom-container" :class="{'night': !isDay}">
  <PlayRoomHeader
    :isGameStarted="gameInfo.started"
    :gameTurn="gameInfo.turn"
    :isHost="isHost"
    :playerNum="gameInfo.players.length"
    :userInfo="userInfo"
    :leave="playerLeave"
    :start="startGame"
  />
  <div id="playroom-body" class="fl-center">
    <transition name="friend-list">
      <div class="left-panel" v-if="!gameInfo.started">
        <PlayRoomFriendList :userName="userInfo.name" />
      </div>
    </transition>
    <PlayRoomPlayerList
      :players="gameInfo.players"
      :userInfo="userInfo"
      :gameTurn="gameInfo.turn"
      :isGameStarted="gameInfo.started"
      :isHost="isHost"
    />
    <PlayRoomChatbox
      :isGameStarted="gameInfo.started"
      :userInfo="userInfo"
      :isDay="isDay"
    />
  </div>
  <transition name="slide-up">
  <PlayRoomRoleList
    :playerNum="gameInfo.players.length"
    :isDay="isDay"
    :isGameStarted="gameInfo.started" />
  </transition>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import PlayRoomFriendList from '@/components/playroom/PlayRoomFriendList';
import PlayRoomChatbox from '@/components/playroom/PlayRoomChatbox';
import PlayRoomHeader from '@/components/playroom/PlayRoomHeader';
import PlayRoomPlayerList from '@/components/playroom/PlayRoomPlayerList';
import PlayRoomRoleList from '@/components/playroom/PlayRoomRoleList';

export default {
  name: 'PlayRoom',
  components: {
    PlayRoomFriendList,
    PlayRoomChatbox,
    PlayRoomHeader,
    PlayRoomPlayerList,
    PlayRoomRoleList,
  },
  data() {
    return {
      messages: [],
      gameInfo: {
        players: [],
        started: false,
        turn: '',
      },
      userInfo: {
        name: this.$store.getters['auth/getUserName'],
        role: '',
        isAlive: true,
      },
      bgUrl: '@/assets/img/day7.jpg',
    };
  },
  computed: {
    isHost() {
      if (this.gameInfo.players.length > 0) {
        return this.userInfo.name === this.gameInfo.players[0].name;
      }
      return false;
    },
    isDay() {
      return !this.gameInfo.started || ['dayStart', 'villager', 'dayEnd', 'gameStart', 'gameEnd', 'hunterDay', 'shootDay', 'hunterNight', 'shootNight'].includes(this.gameInfo.turn);
    },
  },
  methods: {
    playerLeave() {
      if (this.gameInfo.players.length > 1) {
        this.$store.getters['socket/getUserSocket'].emit('leave', { userName: this.userInfo.name, roomId: this.$route.params.id });
      } else if (this.gameInfo.players.length === 1) {
        this.$store.getters['socket/getUserSocket'].emit('deleteRoom', { userName: this.userInfo.name, roomId: this.$route.params.id });
      }
      this.$router.push('/homepage');
    },
    startGame() {
      this.$store.getters['socket/getUserSocket'].emit('start', { roomId: this.$route.params.id });
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('roomPlayer', (room) => {
      this.gameInfo.players = room.playerList;
      this.gameInfo.started = room.isStarted;
      console.log(this.gameInfo.players);
      const me = this.gameInfo.players.find(
        (player) => player.name === this.userInfo.name,
      );
      this.userInfo.role = me.role;
      this.userInfo.isAlive = me.isAlive;
    });

    this.$store.getters['socket/getUserSocket'].on('changeTurn', (data) => {
      this.gameInfo.turn = data.roomTurn;
      if (this.isHost) {
        this.$store.getters['socket/getUserSocket'].emit('turnChange', { roomId: this.$route.params.id, skipped: data.skipped });
      }
    });

    this.$store.getters['socket/getUserSocket'].on('kicked', () => {
      this.$store.getters['socket/getUserSocket'].emit('leave', { userName: this.userInfo.name, roomId: this.$route.params.id });
      this.$router.push('/homepage');
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.playroom-container {
  width: 100%;
  height: 100%;
  background: url("../assets/img/day7.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.night {
  background: url("../assets/img/night1.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#playroom-body {
  min-height: 60%;
  align-items: stretch;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}

.left-panel {
  width: 18%;
  height: auto;
  box-sizing: border-box;
}

.slide-up-leave-active, .slide-up-enter-active {
  transition: all .5s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-down-leave-active, .slide-down-enter-active {
  transition: all .5s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

</style>
