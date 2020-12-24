<template>
  <div class="box-dark d-fl" :class="{'is-dead': !playerInfo.isAlive}"
    @mouseenter="actionHover = true"
    @mouseleave="actionHover = false">
    <img :src="!playerInfo.isAlive ?
      require('@/assets/img/grave.png') :
      require('@/assets/img/' + avatar + '.png')" />
      <div class="remove-player-button"
        v-show="showRemoveButton"
        @click="removePlayer(playerInfo.name)">
        <img src="@/assets/img/close.svg">
      </div>
    <div class="player-info">
      <div :class="{'align-l': true, wolf: isWolf, me: isMe}">{{ playerInfo.name }}</div>
      <div class="vote-container d-fl">
        <div v-for="vote in votes" :key="playerInfo.name + '-' + vote">
          <img class="vote-avatar"
            :src="require('@/assets/img/' + vote + '.png')"
            v-show="showVote" />
        </div>
        <div v-show="showRoleChecked"
          :class="{'wolf': playerInfo.role==='wolf', 'not-wolf': playerInfo.role !=='wolf'}">
          {{checkRole.message}}
        </div>
        <div v-for="effect in effects" :key="effect">
          <img class="effect-container"
          :src="require('@/assets/img/' + effect + '.svg')" v-show="myTurn" />
        </div>
      </div>
    </div>
    <div class="action-container" v-if="actionHover && gameTurn === 'villager' && userInfo.isAlive">
      <play-room-action-list-item :action="dayAction" :target="playerInfo.name"
      :committer="userInfo.name" :notAvailable="checkAvailability(dayAction)">
      </play-room-action-list-item>
    </div>
    <div class="action-container" v-if="actionHover && myTurn && userInfo.isAlive">
      <play-room-action-list-item v-for="action in roleActions[userInfo.role]" :key="action"
      :action="action" :target="playerInfo.name" :committer="userInfo.name"
      :notAvailable="checkAvailability(action)" @triggereffect="addEffect">
      </play-room-action-list-item>
    </div>
  </div>
</template>

<script>
import PlayRoomActionListItem from './PlayRoomActionListItem';

export default {
  name: 'PlayRoomPlayerListItem',
  components: { PlayRoomActionListItem },
  props: ['avatar', 'playerInfo', 'userInfo', 'votes', 'gameTurn', 'checkRole', 'myTurn', 'isHost', 'isGameStarted'],
  data() {
    return {
      actionHover: false,
      dayAction: 'vote',
      roleActions: {
        wolf: ['kill'],
        guard: ['protect'],
        seer: ['check'],
        witch: ['poison', 'save'],
        hunter: ['shoot'],
        villager: [],
      },
      disabledActions: [],
      effects: [],
    };
  },
  methods: {
    checkAvailability(action) {
      return this.disabledActions.includes(action);
    },
    removeFromDisabledList(actionList) {
      actionList.forEach((actionType) => {
        const actionIndex = this.disabledActions.findIndex((action) => action === actionType);
        if (actionIndex >= 0) {
          this.disabledActions.splice(actionIndex, 1);
        }
      });
    },
    addEffect(effect) {
      this.effects.push(effect);
    },
    removePlayer(playerName) {
      this.$store.getters['socket/getUserSocket'].emit('kick', { roomId: this.$route.params.id, playerName });
    },
  },
  computed: {
    isWolf() {
      return this.playerInfo.role === 'wolf' && this.userInfo.role === 'wolf';
    },
    isMe() {
      return this.playerInfo.name === this.userInfo.name;
    },
    isDay() {
      return this.gameTurn === 'dayStart' || this.gameTurn === 'villager' || this.gameTurn === 'dayEnd';
    },
    showVote() {
      return this.isDay || this.userInfo.role === 'wolf';
    },
    showRoleChecked() {
      return this.checkRole.isChecking && this.playerInfo.name === this.checkRole.target;
    },
    showRemoveButton() {
      return !this.isGameStarted && this.isHost && this.actionHover && !this.isMe;
    },
  },
  watch: {
    gameTurn(value) {
      if (value === 'dayStart') {
        this.removeFromDisabledList(['protect', 'check', 'kill']);
        this.effects = [];
      } else if (value === 'dayEnd') {
        this.removeFromDisabledList(['vote']);
      } else if (value === 'gameEnd') {
        this.disabledActions = [];
      }
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('disable', (actionList) => {
      this.disabledActions = this.disabledActions.concat(actionList);
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-dark {
  align-items: center;
  position: relative;
  height: 70px;
  pointer-events: auto;
  border: 1px solid transparent;
}

.player-info {
  align-self: flex-start;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box-dark > img {
  max-width: 3.5rem;
  min-width: 3rem;
  height: 3.7rem;
}

.vote-container {
  flex-wrap: wrap;
  margin-top: 5px;
}

.vote-avatar {
  width: 0.7rem;
  height: 1rem;
  margin-right: 5px;
}

.effect-container {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 5px;
}

.wolf {
  color: $red;
}

.not-wolf {
  color: $yellow;
}

.me {
  color: $aqua !important;
}

.is-dead {
  background-color: $light !important;
  color: $black !important;
  pointer-events: none;
  &:hover {
    cursor: not-allowed !important;
  }
}

.action-container {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 70%;
  left: 30%;
  bottom: 5%;
  padding: none;
}

.remove-player-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 30px;
  height: 30px;
  right: -5%;
  top: -10%;
  border-radius: 15px;
  background-color: $dark;
  cursor: pointer;
}

</style>
