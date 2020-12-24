<template>
  <div
  @mouseenter="hover = true" @mouseleave="hover = false">
  <div class="invite-message">{{inviteMessage}}</div>
    <div class="button-container">
      <img src="@/assets/img/check-mark.svg" class="image-container" @click="accept">
      <img src="@/assets/img/close.svg" class="image-container" @click="decline()">
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeInviteRequest',
  props: ['request', 'userName'],
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    inviteMessage() {
      return `${this.request.inviter} invites you to join room ${this.request.roomId}`;
    },
  },
  methods: {
    accept() {
      this.$store.getters['socket/getUserSocket'].emit('join', { userName: this.userName, roomId: this.request.roomId });
      this.$router.push(`/playroom/${this.request.roomId}`);
    },
    decline() {
      this.$emit('decline', this.request);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/styles/_base';
.image-container {
  margin-right: 10px;
  cursor: pointer;
}

.invite-message {
  margin-top: 2px;
  width: 80%;
  text-align: center;
}
</style>
