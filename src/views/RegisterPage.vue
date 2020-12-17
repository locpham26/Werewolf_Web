<template>
  <div v-if="!hasVerified" class="register-page">
    <email-form></email-form>
  </div>
  <div v-else class="register-page">
    <user-info-form></user-info-form>
  </div>
</template>

<script>
import EmailForm from '@/components/register/EmailForm.vue';
import UserInfoForm from '@/components/register/UserInfoForm.vue';

export default {
  components: {
    EmailForm,
    UserInfoForm,
  },
  data() {
    return {
      hasVerified: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.register-page {
  @extend .fl-center;
  height: 100%;
  width: 100%;
  background: url("../assets/img/werewolf.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
