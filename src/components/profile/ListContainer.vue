<template>
  <div class="list-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.list-container {
  position: relative;
  width: 100%;
  height: 10rem;
  padding-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: $dark;
  }
  &::-webkit-scrollbar-thumb {
    background: $light;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: $white;
  }
}

</style>
