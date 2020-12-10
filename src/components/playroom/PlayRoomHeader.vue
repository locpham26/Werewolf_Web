<template>
  <div id="playroom-header" class="d-fl">
    <div id="button-container" class="d-fl">
      <button class="box-gray d-fl">
        <img @click="leave" :src="require('@/assets/img/close.svg')" />
      </button>
      <div v-if="isGameStarted">Room ID: {{ $route.params.id }}</div>
    </div>

    <div :style="{marginTop: !isGameStarted && 'auto'}" id="monitor">
      <div v-if="isGameStarted" class="fl-center">
        <div class="box-gray" v-show="gameTurn !== 'dayStart' && 'dayEnd' && 'nightStart'
        && 'gameStart' && 'gameEnd'">{{ countdown }}s</div>
        <p>{{ night }}</p>
        <p>{{ gameTurn }}</p>
      </div>
      <div v-if="isGameStarted && gameTurn !== ''" class="box-gray">
        {{ gameTurn === userInfo.role ?
        monitorMessage[gameTurn].roleMessage :
        monitorMessage[gameTurn].generalMessage }}
      </div>
      <div v-if="!isGameStarted" class="box-gray d-fl">
        <p>Room ID: {{ $route.params.id }}</p>
        <button
          v-if="isHost && !isGameStarted"
          :disabled="playerNum < 3"
          @click="start"
          class="red-text"
        >START</button>
        <p>Player: {{ playerNum }}/12</p>
      </div>
    </div>

    <div id="player"
    :style="[isGameStarted ? {'visibility': 'visible'} : {'visibility': 'hidden'}]">
      <div class="box-gray">
        <img class="avatar"
        :src="isGameStarted ?
        require('@/assets/img/' + userInfo.role + '.png') :
        require('@/assets/img/villager.png')"/>
        <p :class="['my-role',{'red-text': userInfo.role === 'wolf'}]">
          You're {{ userInfo.role }}
        </p>
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
      night: 'Second Day',
      monitorMessage: {
        gameStart: {
          generalMessage: 'The game has started. You have been assigned a role. The first night will come soon. Be prepared.',
        },
        villager: {
          roleMessage: 'Everyone!! A new day has come. Discuss with other and vote someone to be hanged.',
          generalMessage: 'Everyone!! A new day has come. Discuss with other and vote someone to be hanged.',
        },
        guard: {
          roleMessage: 'Wake up guard!! Choose anyone to protect from being killed',
          generalMessage: 'It\'s guard\'s turn',
        },
        wolf: {
          roleMessage: 'Wake up wolves!! Discuss with other wolves and kill someone tonight.',
          generalMessage: 'It\'s wolf\'s turn',
        },
        seer: {
          roleMessage: 'Wake up seer!! Check someone\'s role.',
          generalMessage: 'It\'s seer\'s turn',
        },
        witch: {
          roleMessage: 'Wake up witch!! Tonight, the wolves failed to kill anyone. You can poison someone.',
          generalMessage: 'It\'s witch\'s turn',
        },
        hunterDay: {
          roleMessage: 'Hunter!! Shoot someone before you die.',
          generalMessage: 'Hunter is deciding who to shoot.',
        },
        hunterShootDay: {
          generalMessage: 'No one was shot by the hunter.',
        },
        hunterNight: {
          roleMessage: 'Hunter!! Shoot someone before you die.',
          generalMessage: 'Hunter is deciding who to shoot.',
        },
        hunterShootNight: {
          generalMessage: 'No one was shot by the hunter.',
        },
        dayStart: {
          generalMessage: '',
        },
        dayEnd: {
          generalMessage: '',
        },
        nightStart: {
          generalMessage: 'The night has come.',
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
        this.monitorMessage.dayStart.generalMessage = (killedPlayer === this.userInfo.name) ? 'You were killed by the wolves.' : `${killedPlayer} was killed by the wolves.`;
      } else if (killedPlayer === '' && poisonedPlayer !== '') {
        this.monitorMessage.dayStart.generalMessage = (poisonedPlayer === this.userInfo.name) ? 'You were killed by the witch.' : `${poisonedPlayer} was poisoned by the witch.`;
      } else if (killedPlayer !== '' && poisonedPlayer !== '') {
        if (poisonedPlayer === this.userInfo.name && killedPlayer === this.userInfo.name) {
          this.monitorMessage.dayStart.generalMessage = 'You were killed by the wolves and poisoned by the witch. Sorry!!';
        } else if (poisonedPlayer === this.userInfo.name && killedPlayer !== this.userInfo.name) {
          this.monitorMessage.dayStart.generalMessage = `You were poisoned by the witch. ${killedPlayer} was killed by the wolves.`;
        } else if (killedPlayer === this.userInfo.name && poisonedPlayer !== this.userInfo.name) {
          this.monitorMessage.dayStart.generalMessage = `You were killed by the wolves. ${poisonedPlayer} was poisoned by the witch.`;
        } else {
          this.monitorMessage.dayStart.generalMessage = `${killedPlayer} was killed by the wolves. ${poisonedPlayer} was poisoned by the witch.`;
        }
      } else {
        this.monitorMessage.dayStart.generalMessage = 'It was a peaceful night. No one lost their lives.';
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
      if (this.gameTurn === 'hunterShootDay') {
        this.monitorMessage.hunterShootDay.generalMessage = (shotPlayer === this.userInfo.name) ? 'You were shot by the hunter.' : `${shotPlayer} was shot by the hunter.`;
      } else if (this.gameTurn === 'hunterShootNight') {
        this.monitorMessage.hunterShootNight.generalMessage = (shotPlayer === this.userInfo.name) ? 'You were shot by the hunter.' : `${shotPlayer} was shot by the hunter.`;
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
  align-items: center;
  color: $white;
  width: 15%;
  margin-bottom: auto;
}

#button-container button {
  margin-right: 5px;
}

#button-container div {
  font-size: 0.9rem;
}

.fl-center {
  justify-content: space-between;
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

#monitor > .fl-center {
  margin-bottom: 5px;
}

#monitor > .fl-center > .box-gray {
  margin-left: calc(50% - 21px);
}

#monitor > .fl-center > p:nth-child(2) {
  font-size: 1.3rem;
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

.red-text {
  color: $red;
}
</style>
