<template>
  <div v-if="!hasVerified">
    <email-form></email-form>
  </div>
  <div v-else>
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
      hasVerified: true,
    };
  },
};
</script>
