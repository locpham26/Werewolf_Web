<template>
  <p class="form-error" v-if="!isValid">
    <slot></slot>
  </p>
</template>

<script>
export default {
  props: ['isValid'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.form-error {
  @extend .align-l;
  font-family: $font-regular;
  color: $red;
  margin: 5px;
}
</style>
