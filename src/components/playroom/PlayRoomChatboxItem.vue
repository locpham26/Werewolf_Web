<template>
  <div class="d-fl">
    <span :class="{'wolf-message': isFromWolf, 'my-message': isMyMessage}"
    v-show="name !== 'Admin'">{{ name }}</span>
    <span :class="{'admin-message': name === 'Admin'}">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'PlayRoomChatboxItem',
  props: ['name', 'message', 'isFromWolf', 'isMyMessage'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';
@import '@/assets/styles/_mixin';

div {
  margin-bottom: 5px;
}

span:first-child {
  font-family: $font-bold;
  margin-right: 5px;
  color: $yellow;
  float: left;
}

span:nth-child(2) {
  overflow-x: hidden;
  text-align: left;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.admin-message {
  font-family: $font-bold;
  color: $pink;
}

.wolf-message {
  color: $red !important;
}

.my-message {
  color: $aqua !important;
}

</style>
