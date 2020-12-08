<template>
  <div class="box-dark" :class="{'disabled': notAvailable}" @click="invokeAction(action)">
    {{ action }}
  </div>
</template>

<script>
export default {
  name: 'PlayRoomActionListItem',
  props: ['action', 'notAvailable'],
  inject: ['invokeAction'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-dark {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 5px;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    background-color: $light;
    color: $black;
  }
}

.disabled {
  pointer-events: none;
  background-color: $light;
  color: $dark;
  opacity: 0.7;
}

</style>
