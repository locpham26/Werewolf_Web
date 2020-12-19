<template>
  <div
    @mouseenter="hover=true"
    @mouseleave="hover=false"
  >
    <div class="role-number">{{ number }}</div>
    <img :src="require('@/assets/img/' + img + '.png')"/>
    <transition name="fade">
      <div v-if="hover" class="role-info box-white">
        <p class="role-name align-ct">{{ name }}</p>
        <p class="role-description">{{ description }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PlayRoomRoleListItem',
  props: ['name', 'number', 'img', 'description'],
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';
@import '@/assets/styles/_mixin';

img {
  height: 2.5rem;
  width: 2.5rem;
  object-fit: fill;
}

.box-gray {
  width: 4rem;
  height: 4rem;
  border: 1px solid $orange;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
}

.role-number {
  text-align: right;
}

.role-info {
  position: absolute;
  width: 6rem;
  bottom: calc(5rem + 20px);
  left: -12.5px;
  background-color: $white;
  padding: 10px;
}

.role-name {
  text-transform: capitalize;
  font-family: $font-bold;
  font-size: 0.9rem;
  margin-top: 0;
  margin-bottom: 5px;
}

.role-name ~ p {
  margin-top: 0;
  margin-bottom: 0;
}

.role-description {
  font-size: 0.85rem;
}

.role-info::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: -3px;
  left: calc(50% - 5px);
  background-color: $white;
  @include transform(rotate(50deg));
}

.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
