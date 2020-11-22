<template>
  <div class="box-dark d-fl" @click="selectTarget(name)"
  :class="{'selectable': selectable}">
    <img :src="require('@/assets/img/' + avatar + '.png')" />
    <div class="player-info">
      <div :class="{'align-l': true, wolf: isWolf, me: isMe}">{{ name }}</div>
      <div class="vote-container d-fl">
        <div v-for="player in votes" :key="name + '-' + player">
          <img class="vote-avatar"
          :src="require('@/assets/img/' + player + '.png')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayRoomPlayerListItem',
  props: ['avatar', 'name', 'votes', 'isMe', 'isWolf', 'selectable'],
  inject: ['selectTarget'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-dark {
  align-items: center;
  height: 70px;
  pointer-events: none;
  border: 1px solid transparent;
}

.selectable {
  border: 1px solid magenta !important;
  pointer-events: auto;
}

.player-info {
  align-self: flex-start;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box-dark > img {
  width: 3rem;
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

.wolf {
  color: $red;
}

.me {
  color: $aqua !important;
}
</style>
