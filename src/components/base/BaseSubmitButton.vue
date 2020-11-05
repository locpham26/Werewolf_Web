<template>
  <div>
    <button @click="submit">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: ['submit'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

button {
  background: transparent;
  border: transparent;
  border-radius: 5px;
  color: $white;
  font-family: $font-bold;
  font-size: 3rem;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background: $light;
    color: $dark;
  }
  &:focus {
    outline: transparent;
  }
}
</style>
