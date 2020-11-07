<template>
  <list-container>
    <div class="fl-between" v-for="friend in myFriends" :key="friend.name">
      <span>{{friend.name}}</span>
      <span>
        <unfriend-button :property="friend.name" @unfriend='deleteFriend'></unfriend-button>
      </span>
    </div>
  </list-container>
</template>

<script>
import UnfriendButton from './UnfriendButton.vue';
import ListContainer from './ListContainer.vue';

export default {
  components: {
    UnfriendButton,
    ListContainer,
  },
  data() {
    return {
      myFriends: [
        { name: '16Typh' },
        { name: 'ThanhDraw' },
        { name: 'GDucky' },
        { name: 'Tez' },
        { name: 'MCK' },
        { name: 'RIC' },
        { name: 'YunoBigboy' },
        { name: 'Gil' },
        { name: 'Yang' },
        { name: 'AK49' },
        { name: 'RTee' },
        { name: 'HanhOr' },
        { name: 'Gonzo' },
        { name: 'FFF' },
        { name: 'DuyAndy' },
        { name: 'MacJunior' },
        { name: 'LilCell' },
        { name: 'LOR' },
      ],
    };
  },
  methods: {
    deleteFriend(friendName) {
      this.myFriends = this.myFriends.filter((friend) => friend.name !== friendName);
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
