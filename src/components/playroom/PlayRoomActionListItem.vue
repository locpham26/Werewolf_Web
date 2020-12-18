<template>
  <div class="action" :class="{'disabled': notAvailable}" @click="sendAction()">
    {{ action }}
  </div>
</template>

<script>
export default {
  name: 'PlayRoomActionListItem',
  props: ['action', 'notAvailable', 'committer', 'target'],
  methods: {
    sendAction() {
      this.$store.getters['socket/getUserSocket'].emit('playerAction', {
        from: this.committer,
        target: this.target,
        type: this.action,
        roomId: this.$route.params.id,
      });
      if (['poison', 'save', 'protect', 'shoot'].includes(this.action)) {
        this.$emit('triggereffect', this.action);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.action {
  @extend .box-white;
  color: $gray;
  width: 50%;
  padding: 10px;
  font-size: 1rem;
  margin-right: 5px;
  text-transform: capitalize;
  &:hover {
    cursor: pointer;
    background-color: $white;
    color: $black;
  }
}

.disabled {
  pointer-events: none;
  opacity: 0.7;
}

</style>
