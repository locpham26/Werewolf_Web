<template>
  <div id="playroom-header" class="d-fl">
    <div id="button-container" class="fl-between">
      <button class="box-gray d-fl">
        <img @click="leave" src="@/assets/img/close.svg" />
      </button>
      <transition name="slide-skip">
      <button
        id="skip-button"
        class="box-gray"
        v-show="(myTurn || gameTurn === 'villager') && !skipped"
        @click="skip">
        Skip
      </button>
      </transition>
    </div>

    <div :style="{marginTop: !isGameStarted && 'auto'}" id="monitor">
      <div v-if="isGameStarted" class="fl-center">
        <div class="box-gray" v-show="showClock">{{ countdown }}s</div>
        <p class="white-text" :style="!showNightMessage && {visibility: 'hidden'}">
          {{ nightMessage }}
        </p>
      </div>
      <div v-if="isGameStarted && gameTurn !== ''" class="box-gray">
        <transition name="bounce" mode="out-in">
        <p :key="displayedMessage">
          {{displayedMessage}}
        </p>
        </transition>
      </div>
      <div v-if="!isGameStarted" class="box-gray d-fl">
        <p>Room ID: {{ $route.params.id }}</p>
        <button
          v-if="isHost && !isGameStarted"
          :disabled="playerNum < 3"
          @click="start"
          id="start-button"
        >
          START
        </button>
        <p>Player: {{ playerNum }}/12</p>
      </div>
    </div>

    <div
      id="player"
      :style="[
      isGameStarted
      ? {visibility: 'visible', width: '18%'}
      : {visibility: 'hidden', width: '18%'}]"
    >
      <div :class="{
          'my-turn-wolf': myTurn && userInfo.role === 'wolf',
          'my-turn-villager': myTurn && !['wolf', 'villager'].includes(userInfo.role),
          'box-gray': true
        }">
        <img class="avatar"
        :src="isGameStarted ?
        require('@/assets/img/' + userInfo.role + '.png') :
        require('@/assets/img/villager.png')"/>
        <transition name="bounce-name" appear>
        <p :class="['my-role', {
            'red-text': userInfo.role === 'wolf',
            'white-text': myTurn && userInfo.role !== 'villager'}]"
            :key="userInfo.role">
          You're {{ userInfo.role }}
        </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayRoomHeader',
  props: ['isGameStarted', 'gameTurn', 'isHost', 'playerNum', 'userInfo', 'leave', 'start'],
  data() {
    return {
      countdown: '',
      night: 0,
      skipped: false,
      monitorMessage: {
        gameStart: {
          generalMessage: 'The game has started. You have been assigned a role. The first night will come soon. Be prepared.',
        },
        villager: {
          roleMessage: 'Everyone!! Discuss with others and vote someone to be hanged.',
          generalMessage: 'Everyone!! Discuss with others and vote someone to be hanged.',
        },
        guard: {
          roleMessage: 'Wake up guard!! Choose anyone to protect from being killed',
          generalMessage: 'It\'s guard\'s turn.',
        },
        wolf: {
          roleMessage: 'Wake up wolves!! Discuss with other wolves and kill someone tonight.',
          generalMessage: 'It\'s wolf\'s turn.',
        },
        seer: {
          roleMessage: 'Wake up seer!! Check someone\'s role.',
          generalMessage: 'It\'s seer\'s turn.',
        },
        witch: {
          roleMessage: 'Wake up witch!! Tonight, the wolves failed to kill anyone. You can poison someone.',
          generalMessage: 'It\'s witch\'s turn.',
        },
        hunterDay: {
          roleMessage: 'Hunter!! Shoot someone before you die.',
          generalMessage: 'Hunter is deciding who to shoot.',
        },
        shootDay: {
          generalMessage: 'No one was shot by the hunter.',
        },
        hunterNight: {
          roleMessage: 'Hunter!! Shoot someone before you die.',
          generalMessage: 'Hunter is deciding who to shoot.',
        },
        shootNight: {
          generalMessage: 'No one was shot by the hunter.',
        },
        dayStart: {
          generalMessage: '',
        },
        dayEnd: {
          generalMessage: '',
        },
        nightStart: {
          generalMessage: 'The night is coming.',
        },
        gameEnd: {
          generalMessage: '',
        },
        end: {
          generalMessage: '',
        },
      },
    };
  },
  methods: {
    skip() {
      this.skipped = true;
      this.$store.getters['socket/getUserSocket'].emit('skipTurn', { roomId: this.$route.params.id });
      if (this.gameTurn === 'villager' || this.gameTurn === 'wolf') {
        this.$store.getters['socket/getUserSocket'].emit('playerAction', {
          from: this.userInfo.name,
          target: '',
          type: 'skip',
          roomId: this.$route.params.id,
        });
      }
    },
  },
  computed: {
    displayedMessage() {
      return this.gameTurn.slice(0, this.userInfo.role.length) === this.userInfo.role
        ? this.monitorMessage[this.gameTurn].roleMessage
        : this.monitorMessage[this.gameTurn].generalMessage;
    },
    myTurn() {
      return this.userInfo.role !== '' && (this.gameTurn.slice(0, this.userInfo.role.length) === this.userInfo.role);
    },
    showClock() {
      return !['dayStart', 'dayEnd', 'gameStart', 'gameEnd'].includes(this.gameTurn);
    },
    showNightMessage() {
      return !['dayStart', 'dayEnd', 'gameStart', 'gameEnd', 'villager'].includes(this.gameTurn);
    },
    nightMessage() {
      let suffix;
      switch (this.night % 10) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
          break;
      }
      return `${this.night}${suffix} Night`;
    },

  },
  watch: {
    gameTurn(value) {
      if (value === 'nightStart') this.night += 1;
      if (value === 'gameStart') this.night = 0;
      if (value === 'dayStart') this.skipped = false;
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('hang', (hangedPlayer) => {
      if (hangedPlayer !== '') {
        if (hangedPlayer === this.userInfo.name) {
          this.monitorMessage.dayEnd.generalMessage = 'You were hanged.';
        } else {
          this.monitorMessage.dayEnd.generalMessage = `${hangedPlayer} was hanged.`;
        }
      } else {
        this.monitorMessage.dayEnd.generalMessage = 'No one was hanged today.';
      }
    });
    this.$store.getters['socket/getUserSocket'].on('countDown', (count) => {
      this.countdown = count;
    });
    this.$store.getters['socket/getUserSocket'].on('kill', ({ killedPlayer, poisonedPlayer }) => {
      if (killedPlayer !== '' && poisonedPlayer === '') {
        this.monitorMessage.dayStart.generalMessage = (killedPlayer === this.userInfo.name) ? 'A new day has come. Last night, you were killed by the wolves.' : `${killedPlayer} was killed by the wolves.`;
      } else if (killedPlayer === '' && poisonedPlayer !== '') {
        this.monitorMessage.dayStart.generalMessage = (poisonedPlayer === this.userInfo.name) ? 'A new day has come. Last night, you were poisoned by the witch.' : `${poisonedPlayer} was poisoned by the witch.`;
      } else if (killedPlayer !== '' && poisonedPlayer !== '') {
        if (poisonedPlayer === this.userInfo.name && killedPlayer === this.userInfo.name) {
          this.monitorMessage.dayStart.generalMessage = 'A new day has come. Last night, you were killed by the wolves and poisoned by the witch. Sorry!!';
        } else if (poisonedPlayer === this.userInfo.name && killedPlayer !== this.userInfo.name) {
          this.monitorMessage.dayStart.generalMessage = `A new day has come. Last night, you were poisoned by the witch, and ${killedPlayer} was killed by the wolves.`;
        } else if (killedPlayer === this.userInfo.name && poisonedPlayer !== this.userInfo.name) {
          this.monitorMessage.dayStart.generalMessage = `A new day has come. Last night, you were killed by the wolves, and ${poisonedPlayer} was poisoned by the witch.`;
        } else {
          this.monitorMessage.dayStart.generalMessage = `A new day has come. Last night, ${killedPlayer} was killed by the wolves, and ${poisonedPlayer} was poisoned by the witch.`;
        }
      } else {
        this.monitorMessage.dayStart.generalMessage = 'A new day has come. Last night, no one lost their lives.';
      }
    });
    this.$store.getters['socket/getUserSocket'].on('lastProtected', (protectedPlayer) => {
      if (protectedPlayer !== '') {
        this.monitorMessage.guard.roleMessage = `Last night, you protect ${protectedPlayer}. Choose another player to protect tonight`;
      } else {
        this.monitorMessage.guard.roleMessage = 'Wake up guard!! Choose anyone to protect from being killed';
      }
    });
    this.$store.getters['socket/getUserSocket'].on('hunterShoot', (shotPlayer) => {
      if (this.gameTurn === 'hunterDay') {
        this.monitorMessage.shootDay.generalMessage = (shotPlayer === this.userInfo.name) ? 'You were shot by the hunter.' : `${shotPlayer} was shot by the hunter.`;
      } else if (this.gameTurn === 'hunterNight') {
        this.monitorMessage.shootNight.generalMessage = (shotPlayer === this.userInfo.name) ? 'You were shot by the hunter.' : `${shotPlayer} was shot by the hunter.`;
      }
    });
    this.$store.getters['socket/getUserSocket'].on('killedByWolf', (killedPlayer) => {
      if (killedPlayer !== '') {
        this.monitorMessage.witch.roleMessage = `The wolves plan to kill ${killedPlayer} tonight. Save ${killedPlayer} or poison someone.`;
      } else {
        this.monitorMessage.witch.roleMessage = 'Wake up witch!! Tonight, the wolves failed to kill anyone. You can poison someone.';
      }
    });
    this.$store.getters['socket/getUserSocket'].on('win', (winningSide) => {
      this.monitorMessage.gameEnd.generalMessage = (winningSide === 'wolf') ? 'The game has ended. The wolves win.' : 'The game has ended. The villagers win.';
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';
@import '@/assets/styles/_mixin';

#playroom-header {
  justify-content: space-between;
  padding: 20px;
  color: $black;
}

#button-container {
  color: $white;
  width: 18%;
  flex-direction: column;
  align-items: flex-start;
}

#button-container button {
  margin-right: 5px;
}

#button-container div {
  font-size: 0.9rem;
}

#skip-button {
  width: 50%;
}

#skip-button:hover {
  @extend .box-white;
}

.slide-skip-enter-active, .slide-skip-leave-active {
  transition: all 0.5s ease;
}

.slide-skip-enter-from, .slide-skip-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

#player {
  width: 15%;
}

.avatar {
  width: 3rem;
  height: 3rem;
}

.my-role {
  text-transform: uppercase;
  margin-top: 5px;
  color: $yellow;
  font-family: $font-bold;
}

#monitor {
  width: 60%;
}

#monitor > .box-gray > p {
  font-size: 1.1rem;
}

#monitor > .fl-center {
  margin-bottom: 5px;
}

#monitor > .fl-center > .box-gray {
  margin-left: calc(50% - 21px);
  width: 15px;
  text-align: center;
}

#monitor > .fl-center > p:nth-child(2) {
  font-size: 1.2rem;
  font-family: $font-bold;
}

#monitor button {
  background: transparent;
  font-size: 1.7rem;
}

#monitor .d-fl {
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

#monitor .d-fl p {
  font-size: 1rem;
}

p {
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
}

.red-text, #start-button:hover {
  color: $red;
}

#start-button {
  color: $white;
}

.white-text {
  color: $white !important;
}

.my-turn-wolf {
  background: $pink;
  opacity: 0.95;
}

.my-turn-villager {
  background: $orange;
  opacity: 0.95;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-name-enter-active {
  animation: bounce-in 3.0s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  15% {
    transform: scale(1.5);
  }
  30% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.5);
  }
  60% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.5);
  }
  90% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
