<template>
  <div class="box-gray">
    <base-form-title>WEREWOLF</base-form-title>
    <div class="form-guide">
      Forgot your password? Enter your email and we'll send you
      a link to reset your password.
    </div>
    <base-form-input
      :isInputValid="email.isValid"
      :isFormValid="form.isValid"
      :errorMessage="email.errorMessage">Email
      <template v-slot:form-input>
        <input type='email' @input="email.isValid=true" v-model.trim="email.value" />
      </template>
    </base-form-input>
    <base-submit-button @click="submitForm">Reset Password</base-submit-button>
    <base-form-footer v-if="showMessage">Don't get the email?
      <template v-slot:click>
        <resend-button :email="email.value"></resend-button>
      </template>
    </base-form-footer>
  </div>
</template>

<script>
import BaseFormInput from '../base/BaseFormInput.vue';
import BaseFormTitle from '../base/BaseFormTitle.vue';
import BaseFormFooter from '../base/BaseFormFooter.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';
import ResendButton from '../base/ResendButton.vue';
import validateEmailFormat from '../../utils/validateEmailFormat';

export default {
  components: {
    BaseFormInput,
    BaseFormTitle,
    BaseFormFooter,
    BaseSubmitButton,
    ResendButton,
  },
  data() {
    return {
      email: {
        value: '',
        isValid: true,
        errorMessage: '',
      },
      form: {
        isValid: true,
        errorMessage: '',
      },
      showMessage: false,
    };
  },
  methods: {
    validateEmail() {
      const result = validateEmailFormat(this.email.value);
      this.email.isValid = result.isValid;
      this.email.errorMessage = result.errorMessage;
    },
    submitForm() {
      this.validateEmail();
      if (this.email.isValid) {
        setTimeout(() => {
          console.log(this.email.value);
          this.form.isValid = true;
          this.showMessage = true;
        }, 1000);
      }
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

.form-guide {
  font-family: $font-regular;
  margin-top: 5px;
}

</style>
