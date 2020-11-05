<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/_base';

p {
  @extend .align-l;
  font-family: $font-regular;
  font-size: 1rem;
  margin: 5px auto;
}

</style>
