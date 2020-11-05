<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="form-guide"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

div {
  &:nth-child(1) {
    font-family: $font-bold;
    font-size: 3rem;
  }
  &:nth-child(2) {
    font-family: $font-regular;
    font-size: 1rem;
    margin-bottom: 10px;
  }
}

</style>
