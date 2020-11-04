<template>
  <div class="d-fl">
    <div class="input-label">
      <slot></slot>
    </div>
    <div class="input-container" :class="{invalid: !isFormValid || !isInputValid}">
      <slot name="form-input"></slot>
    </div>
    <base-form-error :isValid="isInputValid">
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

.d-fl {
  margin-top: 20px;
}

.input-container {
  @extend .box-white;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding-left: 15px;
  margin-top: 5px;
}

.invalid {
  border: 2px solid $red;
}

.input-label {
  @extend .align-l;
  font-family: $font-bold;
}

input {
  width: 100%;
  height: 100%;
  font-family: $font-regular;
  font-size: 1rem;
  background: none;
  border: none;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
}

</style>
