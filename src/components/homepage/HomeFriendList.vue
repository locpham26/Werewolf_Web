<template>
  <div class="home-friend-list">
    <friend-list></friend-list>
  </div>
</template>

<script>
import FriendList from '@/components/common/FriendList';

export default {
  name: 'HomeFriendList',
  components: { FriendList },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.home-friend-list {
  height: 100%;
}
</style>
