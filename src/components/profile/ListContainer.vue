<template>
  <div class="list-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_base';
@import '@/assets/styles/_mixin';

.list-container {
  position: relative;
  width: 100%;
  height: 10rem;
  padding-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  @include scrollbars();
}

</style>
