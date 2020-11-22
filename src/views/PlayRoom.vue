<template>
<div class="playroom-container">
  <PlayRoomHeader
    :isGameStarted="gameInfo.started"
    :gameTurn="gameInfo.turn"
    :isHost="userInfo.isHost"
    :playerNum="players.length"
    :userInfo="userInfo"
    :leave="playerLeave"
    :start="startGame"
  />
  <div id="playroom-body" class="fl-center">
    <div class="left-panel" v-if="gameInfo.started" >
      <PlayRoomActionList :playerRole="userInfo.role" :gameTurn="gameInfo.turn" />
    </div>
    <div class="left-panel" v-if="!gameInfo.started"><PlayRoomFriendList /></div>
    <PlayRoomPlayerList :players="players" :userInfo="userInfo"
    :selectable="pendingAction.type !== '' && pendingAction.target === '' "
    :isDay="gameInfo.started && gameInfo.turn === 'dayStart' || gameInfo.turn ==='villager'" />
    <PlayRoomChatbox
      :isGameStarted="gameInfo.started"
      :messages="messages"
      :sendMessage="sendMessage"
      :userInfo="userInfo"
    />
  </div>
  <PlayRoomRoleList :playerNum="players.length" />
  </div>
</template>

<script>
import PlayRoomFriendList from '@/components/playroom/PlayRoomFriendList';
import PlayRoomActionList from '@/components/playroom/PlayRoomActionList';
import PlayRoomChatbox from '@/components/playroom/PlayRoomChatbox';
import PlayRoomHeader from '@/components/playroom/PlayRoomHeader';
import PlayRoomPlayerList from '@/components/playroom/PlayRoomPlayerList';
import PlayRoomRoleList from '@/components/playroom/PlayRoomRoleList';

export default {
  name: 'PlayRoom',
  components: {
    PlayRoomFriendList,
    PlayRoomActionList,
    PlayRoomChatbox,
    PlayRoomHeader,
    PlayRoomPlayerList,
    PlayRoomRoleList,
  },
  data() {
    return {
      players: [],
      messages: [],
      gameInfo: {
        started: false,
        turn: 'dayStart',
      },
      userInfo: {
        isHost: false,
        name: this.$store.getters['auth/getUserName'],
        role: '',
      },
      pendingAction: {
        type: '',
        target: '',
      },
    };
  },
  watch: {
    players() {
      this.userInfo.isHost = (this.userInfo.name === this.players[0].name);
    },
    gameInfo: {
      deep: true,
      handler() {
        if (this.gameInfo.started) {
          if (this.gameInfo.turn === 'villager') {
            setTimeout(() => {
              this.gameInfo.turn = 'dayEnd';
            }, 20000);
          } else if (this.gameInfo.turn === 'dayEnd') {
            if (this.userInfo.isHost) {
              this.$store.getters['socket/getUserSocket'].emit('dayEnd');
            }
            setTimeout(() => {
              this.gameInfo.turn = 'guard';
            }, 6000);
          } else if (this.gameInfo.turn === 'guard') {
            setTimeout(() => {
              this.gameInfo.turn = 'wolf';
            }, 6000);
          } else if (this.gameInfo.turn === 'wolf') {
            setTimeout(() => {
              this.gameInfo.turn = 'seer';
            }, 6000);
          } else if (this.gameInfo.turn === 'seer') {
            setTimeout(() => {
              this.gameInfo.turn = 'dayStart';
            }, 6000);
          } else if (this.gameInfo.turn === 'dayStart') {
            setTimeout(() => {
              this.gameInfo.turn = 'villager';
            }, 6000);
          }
        }
      },
    },
  },
  methods: {
    playerLeave() {
      this.$store.getters['socket/getUserSocket'].emit('leave');
      this.$router.push('/homepage');
    },
    sendMessage(sentMessage, isFromWolf) {
      this.$store.getters['socket/getUserSocket'].emit('sendMessage', {
        text: sentMessage,
        isFromWolf,
      });
    },
    startGame() {
      this.$store.getters['socket/getUserSocket'].emit('start');
    },
    callAction(actionType) {
      this.pendingAction.type = actionType;
      console.log(this.pendingAction.type);
    },
    chooseTarget(targetName) {
      this.pendingAction.target = targetName;
      this.$store.getters['socket/getUserSocket'].emit('playerAction', {
        from: this.userInfo.name,
        target: this.pendingAction.target,
        type: this.pendingAction.type,
      });
      this.pendingAction.type = '';
      this.pendingAction.target = '';
    },
  },
  provide() {
    return {
      invokeAction: this.callAction,
      selectTarget: this.chooseTarget,
    };
  },
  mounted() {
    console.log('mounted');
    this.$store.getters['socket/getUserSocket'].on('roomPlayer', (players) => {
      this.players = players;
    });
    this.$store.getters['socket/getUserSocket'].on('message', (message) => {
      this.messages.push(message);
    });
    this.$store.getters['socket/getUserSocket'].on('gameStarted', () => {
      this.gameInfo.started = true;
      console.log(this.gameInfo.started);
      const me = this.players.find(
        (player) => player.name === this.userInfo.name,
      );
      this.userInfo.role = me.role;
    });
  },
};
</script>

<style lang="scss" scoped>

.playroom-container {
  width: 100%;
  height: 100%;
}

#playroom-body {
  min-height: 28rem;
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
