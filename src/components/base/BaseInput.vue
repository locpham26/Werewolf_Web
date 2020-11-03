<template>
  <div class="d-fl">
    <div class="input-label">
      <slot></slot>
    </div>
    <div class="input-container" :class="{invalid: !isFormValid || !isValid}">
      <slot name="form-input"></slot>
    </div>
    <p class="input-error" v-if="!isValid">
      <slot name="error-message"></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ['isValid', 'isFormValid'],
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
}

input:focus {
  outline: none;
}

.input-error {
  @extend .align-l;
  font-family: $font-regular;
  color: $red;
  margin: 5px;
}

</style>
