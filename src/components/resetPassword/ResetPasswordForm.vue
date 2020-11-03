<template>
  <div class="box-gray">
    <base-form-title>WEREWOLF</base-form-title>
    <div class="form-guide">
      Forgot your password? Enter your email and we'll send you
      a link to reset your password.
    </div>
    <base-input :isValid="email.isValid" :isFormValid="form.isValid">Email
      <template v-slot:form-input>
        <input type='email' @input="email.isValid=true" v-model.trim="email.value" />
      </template>
      <template v-slot:error-message>
        {{email.message}}
      </template>
    </base-input>
    <base-submit-button @click="submitForm">Reset Password</base-submit-button>
    <base-form-footer v-if="showMessage">Don't get the email?
      <template v-slot:click>
        <resend-button :email="email.value"></resend-button>
      </template>
    </base-form-footer>
  </div>
</template>

<script>
import BaseInput from '../base/BaseInput.vue';
import BaseFormTitle from '../base/BaseFormTitle.vue';
import BaseFormFooter from '../base/BaseFormFooter.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';
import ResendButton from '../base/ResendButton.vue';

export default {
  components: {
    BaseInput,
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
        message: '',
      },
      form: {
        isValid: true,
        message: '',
      },
      showMessage: false,
    };
  },
  methods: {
    validateEmail() {
      if (this.email.value === '') {
        this.email.isValid = false;
        this.email.message = 'Email cannot be empty.';
      } else {
        this.email.isValid = true;
      }
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
