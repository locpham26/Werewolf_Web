<template>
  <div class="box-gray">
    <base-form-header>WEREWOLF
    <template v-slot:form-guide>
      Forgot your password? Enter your email and we'll send you
      a link to reset your password.
    </template>
    </base-form-header>
    <base-form-input
      :isInputValid="email.isValid"
      :isFormValid="form.isValid"
      :errorMessage="email.errorMessage">Email
      <template #form-input>
        <input type='email' @input="email.isValid=true" v-model.trim="email.value" />
      </template>
    </base-form-input>
    <base-submit-button :submit="submitForm">Reset Password</base-submit-button>
    <base-form-message v-if="emailSent">
      <p>An email was sent to {{email.value}}.</p>
    </base-form-message>
    <base-form-message v-if="emailNotReceived">
      <p>Don't get the email?
        <resend-button :email="email.cachedValue"></resend-button>
      </p>
    </base-form-message>
  </div>
</template>

<script>
import validateEmailFormat from '@/utils/validateEmailFormat';
import BaseFormInput from '../base/BaseFormInput.vue';
import BaseFormHeader from '../base/BaseFormHeader.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';
import BaseFormMessage from '../base/BaseFormMessage.vue';
import ResendButton from '../base/ResendButton.vue';

export default {
  components: {
    BaseFormInput,
    BaseFormHeader,
    BaseSubmitButton,
    BaseFormMessage,
    ResendButton,
  },
  data() {
    return {
      email: {
        value: '',
        cachedValue: '',
        isValid: true,
        errorMessage: '',
      },
      form: {
        isValid: true,
        errorMessage: '',
      },
      emailSent: false,
      emailNotReceived: false,
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
          this.form.isValid = true;
          this.emailSent = true;
        }, 1000);
        setTimeout(() => {
          this.emailSent = false;
          this.emailNotReceived = true;
          this.email.value = '';
        }, 8000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-gray {
  width: 25rem;
  padding: 2rem !important;
  height: 17rem;
}

.form-guide {
  font-family: $font-regular;
  margin-top: 5px;
}

p {
  @extend .align-ct;
}

</style>
