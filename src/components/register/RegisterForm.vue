<template>
  <div class="box-gray">
    <form-title></form-title>
    <form-input v-for="field in fields" :key="field" :field="field"></form-input>
    <form-submit-button buttonName='Register'></form-submit-button>
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
      fields: ['Username', 'Email', 'Password'],
    };
  },
  components: {
    FormInput,
    FormTitle,
    FormSubmitButton,
  },
  methods: {
    resendEmail() {
      console.log('Resending...');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-gray {
  width: 25rem;
  padding: 2rem;
}

.footer {
  font-family: $font-regular;
  span {
    font-family: $font-bold;
    cursor: pointer;
  }
}
</style>
