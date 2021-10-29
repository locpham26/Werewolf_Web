<template>
  <div class="box-gray">
    <div v-if="!showMessage">
    <base-form-header>
      WEREWOLF
      <template v-slot:form-guide>
        Register a new account with your email
      </template>
    </base-form-header>
    <base-form-input
      :isFormValid="form.isValid"
      :isInputValid="email.isValid"
      :errorMessage="email.errorMessage">{{email.label}}
      <template v-slot:form-input>
        <input :type="email.type" @input="email.isValid=form.isValid=true"
        v-model.trim="email.value" />
      </template>
    </base-form-input>
    <base-submit-button class="register-button" :submit="submitForm">Register</base-submit-button>
    </div>
    <div class="confirm-request" v-else>
      <base-form-message>
        <p>Email registered successfully.</p>
        <p>We'll send a confirmation email shortly.</p>
        <p v-if="showRequest">Didn't get the email?
          <resend-button :email="email.cachedValue"></resend-button>
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
      email: {
        label: 'Email',
        type: 'email',
        value: '',
        cachedValue: '',
        isValid: true,
        errorMessage: '',
      },
      form: {
        isValid: true,
      },
      showMessage: false,
      showRequest: false,
    };
  },
  methods: {
    validateEmail() {
      const result = validateEmailFormat(this.email.value);
      this.email.isValid = result.isValid;
      this.email.errorMessage = result.errorMessage;
    },
    resetInput() {
      this.email.value = '';
    },
    async submitForm() {
      console.log(this.email.value);
      this.validateEmail();
      if (this.email.isValid) {
        setTimeout(() => {
          console.log(this.email.value);
          this.form.isValid = true;
          this.email.cachedValue = this.email.value;
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
  padding: 2rem !important;
}

.confirm-request {
  height: 6rem;
}

.register-button {
  margin-bottom: 0px !important;
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
