<template>
  <div id="action-list">
    <div v-show="gameTurn === 'villager'">
      <PlayRoomActionListItem v-for="action in dayActions" :key="action" :action="action" />
    </div>
    <div v-show="gameTurn === playerRole">
      <PlayRoomActionListItem v-for="action in roleActions[playerRole]"
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
        wolf: ['kill', 'skip'],
        guard: ['protect', 'skip'],
        seer: ['check', 'skip'],
        witch: ['poison', 'save', 'skip'],
        hunter: ['shoot', 'skip'],
        villager: [],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
