<template>
  <div class="fl-space">
    <span>
      <slot name="friend"></slot>
    </span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

span:nth-child(1) {
  font-family: $font-regular;
}

</style>
