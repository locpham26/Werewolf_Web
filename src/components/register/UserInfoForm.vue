/* eslint-disable */
<template>
  <div class="box-gray">
    <div>
      <base-form-header>
        WEREWOLF
        <template v-slot:form-guide>
          Register a new account with username and password
        </template>
      </base-form-header>
      <base-form-input
        v-for="(props, field) in fields"
        :key="field"
        :isFormValid="form.isValid"
        :isInputValid="props.isValid"
        :errorMessage="props.errorMessage"
        >{{ props.label }}
        <template v-slot:form-input>
          <input
            :type="props.type"
            @input="props.isValid = form.isValid = true"
            v-model.trim="props.value"
          />
        </template>
      </base-form-input>
      <base-submit-button class="register-button" :submit="submitForm">Register</base-submit-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import validatePasswordFormat from "@/utils/validatePasswordFormat";
import validateUsernameFormat from "@/utils/validateUsernameFormat";
import BaseFormInput from "../base/BaseFormInput.vue";
import BaseFormHeader from "../base/BaseFormHeader.vue";
import BaseSubmitButton from "../base/BaseSubmitButton.vue";

export default {
  components: {
    BaseFormInput,
    BaseFormHeader,
    BaseSubmitButton
  },
  data() {
    return {
      fields: {
        username: {
          label: "Username",
          type: "text",
          value: "",
          isValid: true,
          errorMessage: ""
        },
        password: {
          label: "Password",
          type: "password",
          value: "",
          isValid: true,
          errorMessage: ""
        }
      },
      form: {
        isValid: true
      }
    };
  },
  methods: {
    validateUsername() {
      const result = validateUsernameFormat(this.fields.username.value);
      this.fields.username.isValid = result.isValid;
      this.fields.username.errorMessage = result.errorMessage;
    },
    validatePassword() {
      const result = validatePasswordFormat(this.fields.password.value);
      this.fields.password.isValid = result.isValid;
      this.fields.password.errorMessage = result.errorMessage;
    },
    resetInput() {
      this.fields.username.value = "";
      this.fields.password.value = "";
    },
    async submitForm() {
      this.validateUsername();
      this.validatePassword();
      console.log(this.fields.username);
      try {
        const response = await this.$store.dispatch("auth/register", {
          name: this.fields.username.value,
          password: this.fields.password.value
        });
        if (response.status === 200) {
          await this.$store.dispatch("auth/login", {
            name: this.fields.username.value,
            password: this.fields.password.value
          });
          this.$router.push("/homepage");
        }
      } catch (exception) {
        this.form.isValid = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_base";

.box-gray {
  width: 25rem;
  padding: 2rem !important;
}

.register-button {
  margin-bottom: 0px !important;
}

.register-button {
  margin-top: 15px;
}
</style>
