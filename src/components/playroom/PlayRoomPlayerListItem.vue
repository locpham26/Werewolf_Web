<template>
  <div
    class="box-dark d-fl"
    @click="selectTarget(name)"
    :class="{'selectable': selectable && !isDead, 'is-dead': isDead}"
  >
    <img
      :src="isDead
      ? require('@/assets/img/grave.png')
      : require('@/assets/img/' + avatar + '.png')"
    />
    <div class="player-info">
      <div :class="{'align-l': true, wolf: isWolf, me: isMe}">{{ name }}</div>
      <div class="vote-container d-fl">
        <div v-for="player in votes" :key="name + '-' + player">
          <img
            class="vote-avatar"
            :src="require('@/assets/img/' + player + '.png')"
            v-show="visibleVote"
          />
        </div>
        <div
          v-show="checkRole.isChecking && name === checkRole.target"
          :class="{'wolf': role==='wolf', 'not-wolf': role!=='wolf'}"
        >
          {{checkRole.message}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayRoomPlayerListItem',
  props: [
    'avatar',
    'name',
    'role',
    'votes',
    'isMe',
    'isWolf',
    'selectable',
    'visibleVote',
    'isDead',
    'checkRole',
  ],
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
  &:hover {
    cursor: not-allowed;
  }
}

.selectable {
  border: 1px solid magenta !important;
  pointer-events: auto;
  &:hover {
    cursor: pointer;
  }
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
</style>
