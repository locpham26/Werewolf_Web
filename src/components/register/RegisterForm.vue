<template>
  <div class="box-gray">
    <div v-if="!showMessage">
    <base-form-header>
      WEREWOLF
      <template v-slot:form-guide>
        Register a new account
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
    <base-submit-button class="register-button" :submit="submitForm">Register</base-submit-button>
    </div>
    <div class="confirm-request" v-else>
      <base-form-message>
        <p>User registered successfully.</p>
        <p>We'll send a confirmation email shortly.</p>
        <p v-if="showRequest">Didn't get the email?
          <resend-button :email="fields.email.cachedValue"></resend-button>
        </p>
      </base-form-message>
      <div class="img-container">
        <img src='@/assets/img/left-arrow.svg' v-if="showRequest"
        @click="showMessage=showRequest=false" />
      </div>
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
      fields: {
        username: {
          label: 'Username',
          type: 'text',
          value: '',
          isValid: true,
          errorMessage: '',
        },
        email: {
          label: 'Email',
          type: 'email',
          value: '',
          cachedValue: '',
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
      showMessage: false,
      showRequest: false,
    };
  },
  methods: {
    validateUsername() {
      const result = validateUsernameFormat(this.fields.username.value);
      this.fields.username.isValid = result.isValid;
      this.fields.username.errorMessage = result.errorMessage;
    },
    validateEmail() {
      const result = validateEmailFormat(this.fields.email.value);
      this.fields.email.isValid = result.isValid;
      this.fields.email.errorMessage = result.errorMessage;
    },
    validatePassword() {
      const result = validatePasswordFormat(this.fields.password.value);
      this.fields.password.isValid = result.isValid;
      this.fields.password.errorMessage = result.errorMessage;
    },
    resetInput() {
      this.fields.username.value = '';
      this.fields.email.value = '';
      this.fields.password.value = '';
    },
    submitForm() {
      this.validateUsername();
      this.validatePassword();
      this.validateEmail();
      if (this.fields.username.isValid && this.fields.email.isValid
      && this.fields.password.isValid) {
        setTimeout(() => {
          console.log(this.fields.username.value, this.fields.email.value,
            this.fields.password.value);
          this.form.isValid = true;
          this.fields.email.cachedValue = this.fields.email.value;
          this.resetInput();
          this.showMessage = true;
        }, 1000);
        setTimeout(() => {
          this.showRequest = true;
        }, 6000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-gray {
  width: 25rem;
  height: 28rem;
  padding: 2rem;
}

.register-button {
  margin-top: 15px;
}

.confirm-request {
  height: 6rem;
}

.img-container {
  display: flex;
  justify-content: left;
  margin-top: 20px;
  img {
    cursor: pointer;
  }
}

</style>
