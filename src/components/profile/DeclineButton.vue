<template>
  <div>
    <button @click="$emit('decline', property)">
      <img src="@/assets/img/close.svg" />
    </button>
    <span>
      Decline
    </span>
  </div>
</template>

<script>
export default {
  props: ['property'],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

div {
  position: relative;
}

button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover + span {
    visibility: visible !important;
  }
}

span {
  font-family: $font-regular;
  font-size: 0.7rem;
  background: $light;
  color: $dark !important;
  border-radius: 2px;
  position: absolute;
  top: -5px;
  left: 15px;
  visibility: hidden;
}

</style>
