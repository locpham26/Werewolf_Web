<template>
  <div class="box-gray">
    <base-form-header>
      WEREWOLF
      <template v-slot:form-guide>
        Sign in with your account
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
    <base-submit-button :submit="submitForm">Play</base-submit-button>
    <div class="fl-space">
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
      if (this.fields[0].isValid && this.fields[1].isValid) {
        setTimeout(() => {
          console.log(this.fields[0].value, this.fields[1].value);
          this.form.isValid = false;
          this.fields[1].errorMessage = 'Invalid email or password';
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
