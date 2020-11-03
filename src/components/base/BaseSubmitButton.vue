<template>
  <div class="fl-center">
    <div class="submit-button">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.submit-button {
  background: transparent !important;
  border: none;
  color: $white;
  font-family: $font-bold;
  font-size: 3rem;
  margin: 10px 0px;
  cursor: pointer;
}
</style>
