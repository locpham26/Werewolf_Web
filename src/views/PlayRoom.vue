<template>
<div class="playroom-container" :class="{'night': !isDay}">
  <transition name="slide-down" appear>
  <PlayRoomHeader
    :isGameStarted="gameInfo.started"
    :gameTurn="gameInfo.turn"
    :isHost="isHost"
    :playerNum="gameInfo.players.length"
    :userInfo="userInfo"
    :leave="playerLeave"
    :start="startGame"
  />
  </transition>
  <div id="playroom-body" class="fl-center">
    <transition appear name="slide-in" mode="out-in">
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
  </div>>
  <PlayRoomRoleList
    :playerNum="gameInfo.players.length"
    :isDay="isDay"
    :isGameStarted="gameInfo.started" />
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

@mixin background-property($imageUrl) {
  background-image: url($imageUrl);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: background-image 2.5s ease-in-out;
}

.playroom-container {
  width: 100%;
  height: 100%;
  @include background-property("../assets/img/day7.jpg")
}

.night {
  @include background-property("../assets/img/night1.jpg")
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

.slide-in-leave-active, .slide-in-enter-active {
  transition: all 1.5s ease-in-out;
}
.slide-in-enter-from, .slide-in-leave-to {
  transform: translateX(-10px);
  width: 0;
  opacity: 0;
}

.slide-down-leave-active, .slide-down-enter-active {
  transition: all 1.5s linear;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-20px);
  height: 0;
  opacity: 0;
}
</style>
