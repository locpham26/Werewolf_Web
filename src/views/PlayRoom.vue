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
    <PlayRoomPlayerList :players="gameInfo.players" :userInfo="userInfo"
    :gameTurn="gameInfo.turn" />
    <PlayRoomChatbox
      :isGameStarted="gameInfo.started"
      :messages="messages"
      :sendMessage="sendMessage"
      :userInfo="userInfo"
      :isDay="isDay"
    />
  </div>
  <!-- <div class="left-panel" v-if="!gameInfo.started"><PlayRoomFriendList /></div> -->
  <PlayRoomRoleList :playerNum="gameInfo.players.length" :isDay="isDay" />
  </div>
</template>

<script>
// import PlayRoomFriendList from '@/components/playroom/PlayRoomFriendList';
import PlayRoomChatbox from '@/components/playroom/PlayRoomChatbox';
import PlayRoomHeader from '@/components/playroom/PlayRoomHeader';
import PlayRoomPlayerList from '@/components/playroom/PlayRoomPlayerList';
import PlayRoomRoleList from '@/components/playroom/PlayRoomRoleList';

export default {
  name: 'PlayRoom',
  components: {
    // PlayRoomFriendList,
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
      },
      pendingAction: {
        type: '',
        target: '',
      },
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
      return !this.gameInfo.started || ['dayStart', 'villager', 'dayEnd', 'gameStart', 'gameEnd'].includes(this.gameInfo.turn);
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
    sendMessage(sentMessage, isFromWolf) {
      this.$store.getters['socket/getUserSocket'].emit('sendMessage', {
        userName: this.userInfo.name,
        text: sentMessage,
        isFromWolf,
        roomId: this.$route.params.id,
      });
    },
    startGame() {
      this.$store.getters['socket/getUserSocket'].emit('start', { roomId: this.$route.params.id });
    },
    callAction(actionType) {
      if (actionType === 'skip') {
        this.$store.getters['socket/getUserSocket'].emit('skipTurn', { roomId: this.$route.params.id });
        if (this.gameInfo.turn === 'villager' || this.gameInfo.turn === 'wolf') {
          this.$store.getters['socket/getUserSocket'].emit('playerAction', {
            from: this.userInfo.name,
            target: '',
            type: 'skip',
            roomId: this.$route.params.id,
          });
        }
      } else {
        this.pendingAction.type = actionType;
      }
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
      this.userInfo.actions = me.actions;
    });

    this.$store.getters['socket/getUserSocket'].on('changeTurn', (data) => {
      this.gameInfo.turn = data.roomTurn;
      if (this.userInfo.name === this.gameInfo.players[0].name) {
        this.$store.getters['socket/getUserSocket'].emit('turnChange', { roomId: this.$route.params.id, skipped: data.skipped });
      }
    });

    this.$store.getters['socket/getUserSocket'].on('message', (message) => {
      this.messages.push(message);
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
</style>
