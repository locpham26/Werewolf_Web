<template>
  <div id='my-profile'>
    <my-profile></my-profile>
  </div>
</template>

<script>
import MyProfile from '@/components/profile/MyProfile.vue';

export default {
  components: {
    MyProfile,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

#my-profile {
  @extend .fl-center;
  height: 100%;
  width: 100%;
  background: url("../assets/img/werewolf.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
