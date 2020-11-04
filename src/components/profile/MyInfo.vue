<template>
  <div class="align-l">
    <span class="">{{field}}:</span>
    <span>{{info}}</span>
  </div>
</template>

<script>
export default {
  props: ['field', 'info'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.align-l {
  color: $white;
  margin-top: 5px;
  font-size: 1rem;
  span:nth-child(1) {
    font-family: $font-bold;
    margin-right: 10px;
    text-transform: capitalize;
  }
  span:nth-child(2) {
    font-family: $font-regular;
  }
}

</style>
