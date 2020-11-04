<template>
  <div>
    <button @click="$emit('remove', property)">Remove</button>
  </div>
</template>

<script>
export default {
  props: ['property'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

button {
  background: none;
  border: none;
  outline: none;
  color: $white;
  text-align: left;
  font-family: $font-regular;
  font-size: 1rem;
  cursor: pointer;
}
</style>
