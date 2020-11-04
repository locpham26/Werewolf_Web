<template>
  <div class="box-gray">
    <base-form-title>WEREWOLF</base-form-title>
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
    <base-form-error :isFormValid="form.isValid">
      {{form.message}}
    </base-form-error>
    <base-submit-button @click="submitForm">Register</base-submit-button>
    <base-form-footer v-if="showMessage">User registered successfully.
    We'll send a confirmation email shortly.
      <template v-slot:click>
        <resend-button :email="fields[1].value"></resend-button>
      </template>
    </base-form-footer>
  </div>
</template>

<script>
import validateEmailFormat from '@/utils/validateEmailFormat';
import validatePasswordFormat from '@/utils/validatePasswordFormat';
import validateUsernameFormat from '@/utils/validateUsernameFormat';
import BaseFormInput from '../base/BaseFormInput.vue';
import BaseFormTitle from '../base/BaseFormTitle.vue';
import BaseFormFooter from '../base/BaseFormFooter.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';
import BaseFormError from '../base/BaseFormError.vue';
import ResendButton from '../base/ResendButton.vue';

export default {
  components: {
    BaseFormInput,
    BaseFormTitle,
    BaseFormFooter,
    BaseSubmitButton,
    BaseFormError,
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
        errorMessage: '',
      },
      showMessage: false,
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
    submitForm() {
      this.validateUsername();
      this.validatePassword();
      this.validateEmail();
      if (this.fields[0].isValid && this.fields[1].isValid && this.fields[2].isValid) {
        setTimeout(() => {
          console.log(this.fields[0].value, this.fields[1].value, this.fields[2].value);
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

</style>
