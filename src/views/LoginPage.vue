<template>
  <div>
    <h1>Login Page</h1>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '../components/login/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: 'Berlin Sans FB Demi Bold';
}
</style>
