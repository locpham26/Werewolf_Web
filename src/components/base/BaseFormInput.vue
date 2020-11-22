<template>
  <div class="d-fl-col">
    <div class="input-label">
      <slot></slot>
    </div>
    <div class="input-container" :class="{invalid: !isFormValid || !isInputValid}">
      <slot name="form-input"></slot>
    </div>
    <base-form-error :isValid="isInputValid && isFormValid">
      {{errorMessage}}
    </base-form-error>
  </div>
</template>

<script>
import BaseFormError from './BaseFormError.vue';

export default {
  props: ['isInputValid', 'isFormValid', 'errorMessage'],
  components: {
    BaseFormError,
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/_base';

.input-container {
  @extend .box-white;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding-left: 15px;
  margin-top: 5px;
  border: 2px solid transparent;
  &:focus-within {
    border: 2px solid $aqua;
  }
}

.invalid {
  border: 2px solid $red;
}

.input-label {
  @extend .align-l;
  font-family: $font-bold;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background: $light !important;
  font-family: $font-regular;
}

input {
  width: 100%;
  height: 100%;
  font-family: $font-regular;
  font-size: 1rem;
  background: none;
  border: none;
  box-sizing: border-box;
}

</style>
