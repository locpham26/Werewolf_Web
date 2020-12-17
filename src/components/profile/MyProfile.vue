<template>
  <div class="box-gray">
    <div class="title">My Profile</div>
    <div class="profile-container">
      <div>
        <my-info></my-info>
      </div>
      <div>
        <my-friend-info></my-friend-info>
      </div>
      </div>
  </div>
</template>

<script>
import MyInfo from './MyInfo.vue';
import MyFriendInfo from './MyFriendInfo.vue';

export default {
  components: {
    MyInfo,
    MyFriendInfo,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-gray {
  width: 45rem;
  padding: 2rem !important;
  height: 30rem;
}
.profile-container {
  display: grid;
  grid-template-columns: 20rem 25rem;
  column-gap: 15px;
}

.title {
  font-family: $font-bold;
  font-size: 3rem;
  margin-bottom: 20px;
}

.request-badge {
  display: inline-block;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: $gray;
  color: $white;
  font-family: $font-bold;
  font-size: 10px;
  text-align: center !important;
  position: relative;
  top: -10px;
  left: -5px;
}

</style>
