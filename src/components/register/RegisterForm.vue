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
          minLength: 3,
          maxLength: 12,
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
          minLength: 6,
          maxLength: 15,
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
      if (this.fields[0].value.length <= this.fields[0].maxLength
      && this.fields[0].value.length >= this.fields[0].minLength) {
        this.fields[0].isValid = true;
      } else {
        this.fields[0].isValid = false;
        this.fields[0].errorMessage = 'Username must be between 3 and 12 characters.';
      }
    },
    validatePassword() {
      if (this.fields[2].value.length <= this.fields[2].maxLength
      && this.fields[2].value.length >= this.fields[2].minLength) {
        this.fields[2].isValid = true;
      } else {
        this.fields[2].isValid = false;
        this.fields[2].errorMessage = 'Password must be between 6 and 15 characters.';
      }
    },
    validateEmail() {
      if (this.fields[1].value === '') {
        this.fields[1].isValid = false;
        this.fields[1].errorMessage = 'Email cannot be empty.';
      } else {
        this.fields[1].isValid = true;
      }
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
