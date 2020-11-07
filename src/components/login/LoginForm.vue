<template>
  <div class="box-gray">
    <base-form-header>
      WEREWOLF
      <template v-slot:form-guide>
        Sign in with your account
      </template>
    </base-form-header>
    <base-form-input v-for="(props, field) in fields"
      :key="field"
      :isFormValid="form.isValid"
      :isInputValid="props.isValid"
      :errorMessage="props.errorMessage">{{props.label}}
      <template v-slot:form-input>
        <input :type="props.type" @input="props.isValid=form.isValid=true"
        v-model.trim="props.value" />
      </template>
    </base-form-input>
    <base-submit-button :submit="submitForm">Play</base-submit-button>
    <div class="fl-between">
      <span>
        <router-link to="/register">Create an account</router-link>
      </span>
      <span>
        <router-link to="/resetPassword">Forgot password?</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import BaseFormInput from '../base/BaseFormInput.vue';
import BaseFormHeader from '../base/BaseFormHeader.vue';
import BaseSubmitButton from '../base/BaseSubmitButton.vue';

export default {
  components: {
    BaseFormInput,
    BaseFormHeader,
    BaseSubmitButton,
  },
  data() {
    return {
      fields: {
        username: {
          label: 'Username',
          type: 'text',
          value: '',
          isValid: true,
          errorMessage: '',
        },
        password: {
          label: 'Password',
          type: 'password',
          value: '',
          isValid: true,
          errorMessage: '',
        },
      },
      form: {
        isValid: true,
      },
    };
  },
  methods: {
    validateUsername() {
      this.fields.username.isValid = !(this.fields.username.value === '');
      this.fields.username.errorMessage = !(this.fields.username.isValid)
        ? 'Username cannot be empty.' : '';
    },
    validatePassword() {
      this.fields.password.isValid = !(this.fields.password.value === '');
      this.fields.password.errorMessage = !(this.fields.password.isValid)
        ? 'Password cannot be empty.' : '';
    },
    submitForm() {
      this.validateUsername();
      this.validatePassword();
      if (this.fields.username.isValid && this.fields.password.isValid) {
        setTimeout(() => {
          console.log(this.fields.username.value, this.fields.password.value);
          this.form.isValid = false;
          this.fields.password.errorMessage = 'Invalid email or password';
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
  height: 22rem;
}

a {
  text-decoration: none;
  font-family: $font-regular;
  font-size: 1rem;
  color: $white;
  &:hover {
    background: $light;
    border-radius: 3px;
    color: $dark;
    font-family: $font-bold;
  }
}

</style>
