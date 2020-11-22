<template>
  <div class="friend-container">
    <FriendList>
      <button>
        <img :src="require('@/assets/img/plus.svg')" />
      </button>
    </FriendList>
  </div>
</template>

<script>
import FriendList from '@/components/common/FriendList';

export default {
  name: 'PlayRoomFriendList',
  components: { FriendList },
};
</script>

<style lang="scss" scoped>
.friend-container {
  height: 100%;
  box-sizing: border-box;
  margin-top: 0;
}

button {
  background: transparent;
}
</style>
