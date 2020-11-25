<template>
  <div id="action-list">
    <div v-show="gameTurn === 'villager'">
      <PlayRoomActionListItem v-for="action in dayActions" :key="action" :action="action" />
    </div>
    <div v-show="gameTurn === playerRole">
      <PlayRoomActionListItem v-for="action in nightActions" :key="action" :action="action" />
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
      dayActions: ['Vote', 'Skip'],
    };
  },
  computed: {
    nightActions() {
      if (this.playerRole === 'wolf') {
        return ['Kill', 'Skip'];
      }
      if (this.playerRole === 'guard') {
        return ['Protect', 'Skip'];
      }
      if (this.playerRole === 'seer') {
        return ['Check', 'Skip'];
      }
      if (this.playerRole === 'witch') {
        return ['Kill', 'Protect', 'Skip'];
      }
      return [];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
