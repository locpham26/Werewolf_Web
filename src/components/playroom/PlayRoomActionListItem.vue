<template>
  <div class="box-dark" @click="invokeAction(action)">
    {{ action }}
  </div>
</template>

<script>
export default {
  name: 'PlayRoomActionListItem',
  props: ['action'],
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
</style>
