<template>
  <div id="action-list">
    <div v-show="gameTurn === 'villager'">
      <PlayRoomActionListItem v-for="action in dayActions" :key="action" :action="action" />
    </div>
    <div v-show="gameTurn === playerRole">
      <PlayRoomActionListItem v-for="action in roleActions[playerRole].list"
      :key="action" :action="action" />
    </div>
  </div>
</template>

<script>
import PlayRoomActionListItem from './PlayRoomActionListItem';

export default {
  name: 'PlayRoomActionList',
  props: ['playerRole', 'gameTurn'],
  components: { PlayRoomActionListItem },
  data() {
    return {
      dayActions: ['vote', 'skip'],
      roleActions: {
        wolf: {
          list: ['kill', 'skip'],
        },
        guard: {
          list: ['protect', 'skip'],
          lastProtected: '',
        },
        seer: {
          list: ['check', 'skip'],
        },
        witch: {
          list: ['kill', 'protect', 'skip'],
          kill: 1,
          protect: 2,
        },
        hunter: {
          list: ['shoot', 'skip'],
        },
        villager: {
          list: [],
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
