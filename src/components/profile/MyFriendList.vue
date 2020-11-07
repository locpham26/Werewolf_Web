<template>
  <list-container>
    <div class="fl-between" v-for="friend in myFriends" :key="friend.name">
      <span>{{friend.name}}</span>
      <span>
        <base-button :property="friend.name" buttonEvent="unfriend" @unfriend='deleteFriend'>
          <img src="@/assets/img/remove-user.svg" />
        </base-button>
      </span>
    </div>
  </list-container>
</template>

<script>
import BaseButton from './BaseButton.vue';
import ListContainer from './ListContainer.vue';

export default {
  components: {
    BaseButton,
    ListContainer,
  },
  computed: {
    myFriends() {
      return this.$store.getters['friendInfo/getFriendList'];
    },
  },
  methods: {
    deleteFriend(friendName) {
      this.$store.dispatch('friendInfo/removeFriend', { friendName });
      this.$emit('unfriend', `${friendName} was removed from your friend list.`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.fl-between {
  margin-bottom: 10px;
  padding-right: 25px;
  border-bottom: 1px solid $gray;
}

span:nth-child(1) {
  font-family: $font-regular;
}

</style>
