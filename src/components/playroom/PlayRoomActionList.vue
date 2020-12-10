<template>
  <div id="action-list">
    <div v-show="gameTurn === 'villager'">
      <PlayRoomActionListItem v-for="action in dayActions" :key="action" :action="action"
      :notAvailable="checkAvailability(action)"/>
    </div>
    <div v-show="gameTurn.slice(0, playerRole.length) === playerRole">
      <PlayRoomActionListItem v-for="action in roleActions[playerRole]"
      :key="action" :action="action" :notAvailable="checkAvailability(action)" />
    </div>
  </div>
</template>

<script>
import PlayRoomActionListItem from './PlayRoomActionListItem';

export default {
  name: 'PlayRoomActionList',
  props: ['playerRole', 'gameTurn', 'userName'],
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
      disabledActions: [],
    };
  },
  methods: {
    checkAvailability(action) {
      return this.disabledActions.includes(action);
    },
    removeFromDisabledList(actionList) {
      actionList.forEach((actionType) => {
        const actionIndex = this.disabledActions.findIndex((action) => action === actionType);
        if (actionIndex) {
          this.disabledActions.splice(actionIndex, 1);
        }
      });
    },
  },
  watch: {
    gameTurn(value) {
      if (value === 'dayStart') {
        this.removeFromDisabledList(['protect', 'check', 'kill', 'skip']);
      } else if (value === 'dayEnd') {
        this.removeFromDisabledList(['skip', 'vote']);
      }
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('disable', (actionList) => {
      this.disabledActions = this.disabledActions.concat(actionList);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
