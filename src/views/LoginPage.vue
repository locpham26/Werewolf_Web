<template>
  <div id="login-page">
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

#login-page {
  @extend .fl-center;
  height: 100%;
  width: 100%;
  background: url("../assets/img/werewolf.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
