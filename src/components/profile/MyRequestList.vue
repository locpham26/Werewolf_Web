<template>
<div class="fl-space">
  <div class="align-l">
    <span>
      <slot></slot>
    </span>
  </div>
  <div class="fl-space">
    <span>
      <slot name="accept"></slot>
    </span>
    <span>
      <slot name="remove"></slot>
    </span>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

div:nth-child(1) {
  span {
    font-family: $font-regular;
  }
}

div:nth-child(2) {
  span:nth-child(1) {
    margin-right: 5px;
  }
}

</style>
