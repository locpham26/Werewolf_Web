<template>
  <div>
    <span class="form-question">
      <slot></slot>
    </span>
    <span class="clickable">
      <slot name="click"></slot>
    </span>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/_base';

.form-question {
  font-family: $font-regular;
}

.clickable {
  font-family: $font-bold;
  cursor: pointer;
  a {
    text-decoration: none;
    color: $white;
  }
}
</style>
