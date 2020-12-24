<template>
  <div class="box-gray friend-container">
    <div class="friend-title bold align-l">Friend List</div>
    <div class="friend-name-container">
      <div v-for="name in friends" :key="name" class="d-fl">
        <div class="friend-info d-fl">
          <img src='@/assets/img/user.svg'/>
          <div class="friend-name">{{ name }}</div>
        </div>
        <slot :friendName="name" name="invite"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FriendList',
  data() {
    return {
      friends: [
        'Tez',
        'Draw',
        'WoffWoff',
        'Name',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.friend-container {
  height: calc(100% - 48px);
  margin-top: 10px;
  box-sizing: border-box;
}

.friend-title {
  margin: 7px 0;
  margin-top: 0;
}

.friend-name-container {
  height: calc(100% - 28px);
  overflow-y: auto;
}

.friend-name-container > .d-fl {
  justify-content: space-between;
}

.friend-info {
  margin-bottom: 5px;
}

.friend-name {
  margin-left: 10px;
}
</style>
