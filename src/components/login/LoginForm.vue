<template>
  <div class="box-gray">
    <base-form-title>WEREWOLF</base-form-title>
    <base-input :isValid="username.isValid" :isFormValid="form.isValid">Username
      <template v-slot:form-input>
        <input type='text' @input="username.isValid=form.isValid=true"
        v-model.trim="username.value" />
      </template>
      <template v-slot:error-message>
        {{username.message}}
      </template>
    </base-input>
    <base-input :isValid="password.isValid" :isFormValid="form.isValid">Password
      <template v-slot:form-input>
        <input type="password" @input="password.isValid=form.isValid=true"
        v-model.trim="password.value" />
      </template>
      <template v-slot:error-message>
        {{password.message}}
      </template>
    </base-input>
    <base-form-error :isFormValid="form.isValid">
      {{form.message}}
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
import BaseInput from '../base/BaseInput.vue';
import BaseFormTitle from '../base/BaseFormTitle.vue';
import BaseFormFooter from '../base/BaseFormFooter.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';
import BaseFormError from '../base/BaseFormError.vue';

export default {
  components: {
    BaseInput,
    BaseFormTitle,
    BaseFormFooter,
    BaseSubmitButton,
    BaseFormError,
  },
  data() {
    return {
      username: {
        value: '',
        isValid: true,
        message: '',
      },
      password: {
        value: '',
        isValid: true,
        message: '',
      },
      form: {
        isValid: true,
        message: '',
      },
    };
  },
  methods: {
    validateUsername() {
      this.username.isValid = !(this.username.value === '');
      this.username.message = !(this.username.isValid)
        ? 'Username cannot be empty.' : '';
    },
    validatePassword() {
      this.password.isValid = !(this.password.value === '');
      this.password.message = !(this.password.isValid)
        ? 'Password cannot be empty.' : '';
    },
    submitForm() {
      this.validateUsername();
      this.validatePassword();
      if (this.username.isValid && this.password.isValid) {
        setTimeout(() => {
          console.log(this.username.value, this.password.value);
          this.form.isValid = false;
          this.form.message = 'Invalid email or password';
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
