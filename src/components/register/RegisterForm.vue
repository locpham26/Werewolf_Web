<template>
  <div class="box-gray">
    <base-form-title>WEREWOLF</base-form-title>
    <base-input :isValid="username.isValid" :isFormValid="form.isValid">Username
      <template v-slot:form-input>
        <input type='text' @input="username.isValid=true" v-model.trim="username.value" />
      </template>
      <template v-slot:error-message>
        {{username.message}}
      </template>
    </base-input>
    <base-input :isValid="email.isValid" :isFormValid="form.isValid">Email
      <template v-slot:form-input>
        <input type='text' @input="email.isValid=true" v-model.trim="email.value" />
      </template>
      <template v-slot:error-message>
        {{email.message}}
      </template>
    </base-input>
    <base-input :isValid="password.isValid" :isFormValid="form.isValid">Password
      <template v-slot:form-input>
        <input type="password" @input="password.isValid=true" v-model.trim="password.value" />
      </template>
      <template v-slot:error-message>
        {{password.message}}
      </template>
    </base-input>
    <base-form-error :isFormValid="form.isValid">
      {{form.message}}
    </base-form-error>
    <base-submit-button @click="submitForm">Register</base-submit-button>
    <base-form-footer v-if="showMessage">User registered successfully.
    We'll send a confirmation email shortly.
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
import BaseFormError from '../base/BaseFormError.vue';
import ResendButton from '../base/ResendButton.vue';

export default {
  components: {
    BaseInput,
    BaseFormTitle,
    BaseFormFooter,
    BaseSubmitButton,
    BaseFormError,
    ResendButton,
  },
  data() {
    return {
      username: {
        value: '',
        minLength: 6,
        maxLength: 12,
        isValid: true,
        message: '',
      },
      password: {
        value: '',
        minLength: 6,
        maxLength: 12,
        isValid: true,
        message: '',
      },
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
    validateUsername() {
      if (this.username.value.length <= this.username.maxLength
      && this.username.value.length >= this.username.minLength) {
        this.username.isValid = true;
      } else {
        this.username.isValid = false;
        this.username.message = 'Username must be between 6 and 12 characters.';
      }
    },
    validatePassword() {
      if (this.password.value.length <= this.password.maxLength
      && this.password.value.length >= this.password.minLength) {
        this.password.isValid = true;
      } else {
        this.password.isValid = false;
        this.password.message = 'Password must be between 6 and 12 characters.';
      }
    },
    validateEmail() {
      if (this.email.value === '') {
        this.email.isValid = false;
        this.email.message = 'Email cannot be empty.';
      } else {
        this.email.isValid = true;
      }
    },
    submitForm() {
      this.validateUsername();
      this.validatePassword();
      this.validateEmail();
      if (this.username.isValid && this.password.isValid && this.email.isValid) {
        setTimeout(() => {
          console.log(this.username.value, this.password.value, this.email.value);
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
