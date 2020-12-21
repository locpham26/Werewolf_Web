<template>
  <div
    id="playroom-player-list"
    class="box-gray"
    :style="{width: isGameStarted ? '63%' : '60%'}"
  >
    <div v-for="pos in 12" :key="pos">
      <PlayRoomPlayerListItem
        v-if="getPlayerByPos(pos-1)"
        :avatar="avatars[pos-1]"
        :playerInfo="getPlayerByPos(pos-1)"
        :userInfo="userInfo"
        :votes="getVoteAvatars(getPlayerByPos(pos-1).votes)"
        :checkRole="checkRole"
        :gameTurn="gameTurn"
        :myTurn="myTurn" />
      <div v-else class="empty-pos"></div>
    </div>
  </div>
</template>

<script>
import PlayRoomPlayerListItem from './PlayRoomPlayerListItem';

export default {
  name: 'PlayRoomPlayerList',
  props: ['isGameStarted', 'players', 'userInfo', 'gameTurn'],
  components: { PlayRoomPlayerListItem },
  data() {
    return {
      avatars: [
        'light_red', 'dark_blue', 'light_orange',
        'yellow', 'dark_green', 'purple',
        'light_blue', 'dark_orange', 'dark_red',
        'light_green', 'cyan', 'gray',
      ],
      checkRole: {
        message: '',
        isChecking: false,
        target: '',
      },
    };
  },
  methods: {
    getAvatarByName(playerName) {
      const playerIndex = this.players.findIndex((player) => player.name === playerName);
      if (playerIndex) {
        return this.avatars[playerIndex];
      }
      return null;
    },
    getVoteAvatars(votes) {
      const voteAvatars = [];
      votes.forEach((vote) => {
        voteAvatars.push(this.getAvatarByName(vote));
      });
      return voteAvatars;
    },
    getPlayerByPos(playerPos) {
      const playerAtPos = this.players.find((player) => player.pos === playerPos);
      if (playerAtPos) {
        return playerAtPos;
      }
      return false;
    },
  },
  computed: {
    myTurn() {
      return this.userInfo.role !== '' && (this.gameTurn.slice(0, this.userInfo.role.length) === this.userInfo.role);
    },
  },
  watch: {
    gameTurn(value) {
      this.checkRole.isChecking = value === 'seer' && this.userInfo.role === 'seer';
      if (value !== 'seer') {
        this.checkRole.message = '';
      }
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('reveal', ({ checkTarget, isWolf }) => {
      this.checkRole.target = checkTarget;
      this.checkRole.message = isWolf ? 'Wolf' : 'Not a wolf';
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

#playroom-player-list {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(80px, 1fr));
  column-gap: 20px;
  row-gap: 15px;
}

.empty-pos {
  @extend .box-black;
  opacity: 0.3;
}

</style>
