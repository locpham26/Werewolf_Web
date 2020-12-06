<template>
<div class="playroom-container">
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
    <div class="left-panel" v-if="gameInfo.started" >
      <PlayRoomActionList :playerRole="userInfo.role" :gameTurn="gameInfo.turn" />
    </div>
    <div class="left-panel" v-if="!gameInfo.started"><PlayRoomFriendList /></div>
    <PlayRoomPlayerList :players="gameInfo.players" :userInfo="userInfo"
    :selectable="selectable" :gameTurn="gameInfo.turn"
    :isDay="gameInfo.started && gameInfo.turn === 'dayStart' || gameInfo.turn ==='villager'" />
    <PlayRoomChatbox
      :isGameStarted="gameInfo.started"
      :messages="messages"
      :sendMessage="sendMessage"
      :userInfo="userInfo"
    />
  </div>
  <PlayRoomRoleList :playerNum="gameInfo.players.length" />
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
      messages: [],
      gameInfo: {
        players: [],
        started: false,
        turn: '',
      },
      userInfo: {
        name: this.$store.getters['auth/getUserName'],
        role: '',
        actions: '',
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
    selectable() {
      return this.pendingAction.type !== '' && this.pendingAction.target === '' && (this.gameInfo.turn === this.userInfo.role || this.gameInfo.turn === 'villager');
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
      this.pendingAction.type = actionType;
      console.log(this.pendingAction.type);
    },
    chooseTarget(targetName) {
      this.pendingAction.target = targetName;
      this.$store.getters['socket/getUserSocket'].emit('playerAction', {
        from: this.userInfo.name,
        target: this.pendingAction.target,
        type: this.pendingAction.type,
        roomId: this.$route.params.id,
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
    console.log(this.$store.getters['socket/getUserSocket']);
    this.$store.getters['socket/getUserSocket'].on('roomPlayer', (room) => {
      this.gameInfo.players = room.playerList;
      this.gameInfo.started = room.isStarted;

      const me = this.gameInfo.players.find(
        (player) => player.name === this.userInfo.name,
      );
      this.userInfo.role = me.role;
      this.userInfo.actions = me.actions;
    });

    this.$store.getters['socket/getUserSocket'].on('changeTurn', (turn) => {
      this.gameInfo.turn = turn;
      if (this.userInfo.name === this.gameInfo.players[0].name) {
        console.log(this.gameInfo.players);
        this.$store.getters['socket/getUserSocket'].emit('turnChange', { roomId: this.$route.params.id });
      }
    });

    this.$store.getters['socket/getUserSocket'].on('message', (message) => {
      this.messages.push(message);
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
  // min-height: 28rem;
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
