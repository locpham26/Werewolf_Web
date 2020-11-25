<template>
  <div id="playroom-player-list" class="box-gray" :class="{'day' : isDay}">
      <PlayRoomPlayerListItem
        v-for="(player, i) in players" :key="i"
        :avatar="avatars[i]"
        :name="player.name"
        :votes="getVoteAvatars(player.votes)"
        :isMe="player.name === userInfo.name"
        :isWolf="player.role === 'wolf' && userInfo.role === 'wolf'"
        :selectable="selectable"
        :visibleVote="visibleVote"
        :checkingRole="checkingRole"
        :isDead="!player.isAlive" />
  </div>
</template>

<script>
import PlayRoomPlayerListItem from './PlayRoomPlayerListItem';

export default {
  name: 'PlayRoomPlayerList',
  props: ['players', 'userInfo', 'selectable', 'isDay', 'gameTurn'],
  components: { PlayRoomPlayerListItem },
  data() {
    return {
      avatars: [
        'light_red', 'dark_blue', 'light_orange',
        'yellow', 'dark_green', 'purple',
        'light_blue', 'dark_orange', 'dark_red',
        'light_green', 'cyan', 'gray',
      ],
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
  computed: {
    visibleVote() {
      return this.isDay || this.userInfo.role === 'wolf';
    },
    checkingRole() {
      return this.userInfo.role === 'seer' && this.gameTurn === 'seer';
    },
  },
};
</script>

<style lang="scss" scoped>
#playroom-player-list {
  width: 60%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(80px, 1fr));
  column-gap: 20px;
  row-gap: 15px;
}

.day {
  background-color: rgba(255, 194, 102, 0.4) !important;
}

</style>
