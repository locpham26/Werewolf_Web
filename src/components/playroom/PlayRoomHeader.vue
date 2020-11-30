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
        <div class="box-gray">{{ countdown }}s</div>
        <p>{{ night }}</p>
        <p>{{ gameTurn }}</p>
      </div>
      <div v-if="isGameStarted" class="box-gray">{{ monitorMessage }}</div>
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
        <p
        :class="[
          'my-role',
          {
            'red-text': userInfo.role === 'wolf',
          }
        ]"
      >
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
      countdown: 30,
      night: 'Second Day',
      monitorMessage: '',
    };
  },
  watch: {
    gameTurn(turn) {
      if (turn === 'gameStart') {
        this.monitorMessage = 'The game has started. You have been assigned a role. The first night will come soon. Be prepared.';
      } else if (turn === 'villager') {
        this.monitorMessage = 'It\'s villagers\' turn. Discuss with other and vote someone to be hanged.';
      } else if (turn === 'guard') {
        this.monitorMessage = 'Wake up guard. Protect someone.';
      } else if (turn === 'wolf') {
        this.monitorMessage = 'Wake up wolves. Discuss with other wolves and kill someone.';
      } else if (turn === 'seer') {
        this.monitorMessage = 'Wake up seer. Want to check someone?';
      } else if (turn === 'dayEnd') {
        this.monitorMessage = 'No one was hanged today.';
      } else if (turn === 'dayStart') {
        this.monitorMessage = 'Last night, no one was killed.';
      } else if (turn === 'nightStart') {
        this.monitorMessage = 'The night has come.';
      }
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('hang', (hangedPlayer) => {
      if (this.userInfo.name === hangedPlayer.name) {
        this.monitorMessage = 'You were hanged.';
      } else {
        this.monitorMessage = `${hangedPlayer.name} was hanged. ${hangedPlayer.name} was ${hangedPlayer.role}.`;
      }
    });
    this.$store.getters['socket/getUserSocket'].on('kill', (killedPlayer) => {
      if (this.userInfo.name === killedPlayer.name) {
        this.monitorMessage = 'You were killed.';
      } else {
        this.monitorMessage = `${killedPlayer.name} was killed. ${killedPlayer.name} was ${killedPlayer.role}.`;
      }
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
