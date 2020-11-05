<template>
  <div class="box-gray">
    <div v-if="!showMessage">
    <base-form-header>
      WEREWOLF
      <template v-slot:form-guide>
        Register a new account
      </template>
    </base-form-header>
    <base-form-input v-for="field in fields"
      :key="field.name"
      :isFormValid="form.isValid"
      :isInputValid="field.isValid"
      :errorMessage="field.errorMessage">{{field.label}}
      <template v-slot:form-input>
        <input :type="field.type" @input="field.isValid=form.isValid=true"
        v-model.trim="field.value" />
      </template>
    </base-form-input>
    <base-submit-button class="register-button" :submit="submitForm">Register</base-submit-button>
    </div>
    <div v-else>
    <base-form-message>
      <p>User registered successfully.</p>
      <p>We'll send a confirmation email shortly.</p>
      <p v-if="showRequest">Didn't get the email?
        <resend-button :email="fields[1].cachedValue"></resend-button></p>
    </base-form-message>
    </div>
  </div>
</template>

<script>
import validateEmailFormat from '@/utils/validateEmailFormat';
import validatePasswordFormat from '@/utils/validatePasswordFormat';
import validateUsernameFormat from '@/utils/validateUsernameFormat';
import BaseFormInput from '../base/BaseFormInput.vue';
import BaseFormHeader from '../base/BaseFormHeader.vue';
import BaseFormMessage from '../base/BaseFormMessage.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';
import ResendButton from '../base/ResendButton.vue';

export default {
  components: {
    BaseFormInput,
    BaseFormHeader,
    BaseFormMessage,
    BaseSubmitButton,
    ResendButton,
  },
  data() {
    return {
      fields: [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          value: '',
          isValid: true,
          errorMessage: '',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          value: '',
          cachedValue: '',
          isValid: true,
          errorMessage: '',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          value: '',
          isValid: true,
          errorMessage: '',
        },
      ],
      form: {
        isValid: true,
      },
      showMessage: false,
      showRequest: false,
    };
  },
  methods: {
    validateUsername() {
      const result = validateUsernameFormat(this.fields[0].value);
      this.fields[0].isValid = result.isValid;
      this.fields[0].errorMessage = result.errorMessage;
    },
    validateEmail() {
      const result = validateEmailFormat(this.fields[1].value);
      this.fields[1].isValid = result.isValid;
      this.fields[1].errorMessage = result.errorMessage;
    },
    validatePassword() {
      const result = validatePasswordFormat(this.fields[2].value);
      this.fields[2].isValid = result.isValid;
      this.fields[2].errorMessage = result.errorMessage;
    },
    resetInput() {
      this.fields.forEach((field) => {
        // eslint-disable-next-line no-param-reassign
        field.value = '';
      });
    },
    submitForm() {
      this.validateUsername();
      this.validatePassword();
      this.validateEmail();
      if (this.fields[0].isValid && this.fields[1].isValid && this.fields[2].isValid) {
        setTimeout(() => {
          console.log(this.fields[0].value, this.fields[1].value, this.fields[2].value);
          this.form.isValid = true;
          this.fields[1].cachedValue = this.fields[1].value;
          this.resetInput();
          this.showMessage = true;
        }, 1000);
        setTimeout(() => {
          this.showRequest = true;
        }, 10000);
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

.register-button {
  margin-top: 15px;
}

</style>
