<template>
  <div class="d-fl">
    <div class="align-l">{{field}}</div>
    <input class="box-white" />
  </div>
</template>

<script>
export default {
  props: ['field'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.d-fl {
  margin-top: 20px;
}

.box-white {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  font-family: $font-regular;
  font-size: 1.5rem;
  padding-left: 15px;
  margin-top: 5px;
}

.align-l {
  font-family: $font-bold;
}
</style>
