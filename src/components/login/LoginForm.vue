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
    <base-form-error :isValid="form.isValid">
      {{form.errorMessage}}
    </base-form-error>
    <div class="align-r"><router-link to="/resetPassword">Forgot password?</router-link></div>
    <base-submit-button @click="submitForm">Play</base-submit-button>
    <base-form-footer>Don't have an account?
      <template v-slot:click>
        <router-link to="/register">Register</router-link>
      </template>
    </base-form-footer>
  </div>
</template>

<script>
import BaseFormInput from '../base/BaseFormInput.vue';
import BaseFormTitle from '../base/BaseFormTitle.vue';
import BaseFormFooter from '../base/BaseFormFooter.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';
import BaseFormError from '../base/BaseFormError.vue';

export default {
  components: {
    BaseFormInput,
    BaseFormTitle,
    BaseFormFooter,
    BaseSubmitButton,
    BaseFormError,
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
    };
  },
  methods: {
    validateUsername() {
      this.fields[0].isValid = !(this.fields[0].value === '');
      this.fields[0].errorMessage = !(this.fields[0].isValid)
        ? 'Username cannot be empty.' : '';
    },
    validatePassword() {
      this.fields[1].isValid = !(this.fields[1].value === '');
      this.fields[1].errorMessage = !(this.fields[1].isValid)
        ? 'Password cannot be empty.' : '';
    },
    submitForm() {
      this.validateUsername();
      this.validatePassword();
      if (this.fields[1].isValid && this.fields[1].isValid) {
        setTimeout(() => {
          console.log(this.fields[0].value, this.fields[1].value);
          this.form.isValid = false;
          this.form.errorMessage = 'Invalid email or password';
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

.align-r {
  margin-top: 10px;
  font-family: $font-regular;
  a {
  text-decoration: none;
  color: $white;
  }
}
</style>
