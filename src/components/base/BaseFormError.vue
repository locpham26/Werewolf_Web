<template>
  <div class="container">
    <div class="form-error" v-if="!isValid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isValid'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.container {
  height: 2rem;
}

.form-error {
  @extend .align-l;
  font-family: $font-regular;
  color: $red;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: none;
}
</style>
