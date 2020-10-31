<template>
  <div>
    <h1>Register Page</h1>
    <register-form></register-form>
  </div>
</template>

<script>
import RegisterForm from '../components/register/RegisterForm.vue';

export default {
  components: {
    RegisterForm,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: 'Berlin Sans FB Demi Bold';
}
</style>
