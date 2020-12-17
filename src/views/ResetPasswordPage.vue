<template>
  <div id="reset-password">
    <reset-password></reset-password>
  </div>
</template>

<script>
import ResetPassword from '@/components/resetPassword/ResetPasswordForm.vue';

export default {
  components: {
    ResetPassword,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

#reset-password {
  @extend .fl-center;
  height: 100%;
  width: 100%;
  background: url("../assets/img/werewolf.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
