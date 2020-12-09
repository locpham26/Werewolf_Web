<template>
  <div id="action-list">
    <div v-show="gameTurn === 'villager'">
      <PlayRoomActionListItem v-for="action in dayActions" :key="action" :action="action" />
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
  },
  watch: {
    gameTurn(value) {
      if (value === 'dayStart') {
        const protectIndex = this.disabledActions.findIndex((action) => action === 'protect');
        const checkIndex = this.disabledActions.findIndex((action) => action === 'check');
        this.disabledActions.splice(protectIndex, 1);
        this.disabledActions.splice(checkIndex, 1);
      }
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('disable', (type) => {
      this.disabledActions.push(type);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
