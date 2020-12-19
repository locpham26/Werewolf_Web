<template>
  <div
    id="playroom-player-list"
    class="box-gray"
    :style="{width: isGameStarted ? '63%' : '50%'}"
  >
      <PlayRoomPlayerListItem
        v-for="(player, i) in players" :key="i"
        :avatar="avatars[i]"
        :playerInfo="player"
        :userInfo="userInfo"
        :votes="getVoteAvatars(player.votes)"
        :checkRole="checkRole"
        :gameTurn="gameTurn"
        :myTurn="myTurn" />
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
      return this.avatars[playerIndex];
    },
    getVoteAvatars(votes) {
      const voteAvatars = [];
      votes.forEach((vote) => {
        voteAvatars.push(this.getAvatarByName(vote));
      });
      return voteAvatars;
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

</style>
