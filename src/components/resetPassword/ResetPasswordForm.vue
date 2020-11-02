<template>
  <div class="box-gray">
    <form-title></form-title>
    <div class="statement">
        Forgot your password? Enter your email and we'll send you
        a link to reset your password.
    </div>
    <form-input v-for="field in fields" :key="field" :field="field"></form-input>
    <form-submit-button buttonName='Reset Password'></form-submit-button>
    <div class="footer">Don't get the email?
      <span @click="resendEmail">Resend</span>
    </div>
  </div>
</template>

<script>
import FormInput from '../form/FormInput.vue';
import FormTitle from '../form/FormTitle.vue';
import FormSubmitButton from '../form/FormSubmitButton.vue';

export default {
  data() {
    return {
      fields: ['Email'],
    };
  },
  components: {
    FormInput,
    FormTitle,
    FormSubmitButton,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-gray {
  width: 25rem;
  padding: 2rem;
}

.statement {
  font-family: $font-regular;
}

.footer {
  font-family: $font-regular;
  span {
    font-family: $font-bold;
    cursor: pointer;
  }
}
</style>
