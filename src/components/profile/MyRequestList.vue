<template>
  <list-container>
    <div class="request-container" v-for="request in myRequests" :key="request.id">
      <div class="align-l">
        <span>{{request.from}}</span>
      </div>
      <div class="fl-around">
        <span>
          <base-button :property="request.id" buttonEvent="accept" @accept='acceptRequest'>
            <img src='@/assets/img/check-mark.svg' />
          </base-button>
        </span>
        <span>
          <base-button :property="request.id" buttonEvent="decline" @decline='declineRequest'>
            <img src="@/assets/img/close.svg" />
          </base-button>
        </span>
      </div>
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
  data() {
    return {
      myRequests: [
        { from: 'Hydra', id: 1 },
        { from: 'DeChoat', id: 2 },
        { from: 'TonyD', id: 4 },
        { from: 'TLinh', id: 5 },
        { from: 'Tage', id: 6 },
        { from: 'JBee7', id: 7 },
        { from: 'RickyStar', id: 8 },
        { from: 'LangLD', id: 9 },
        { from: 'VVSix', id: 10 },
        { from: 'DatDope', id: 11 },
      ],
    };
  },
  methods: {
    declineRequest(requestId) {
      const declinedReq = this.myRequests.find((request) => request.id === requestId);
      this.myRequests = this.myRequests.filter((request) => request.id !== requestId);
      this.$emit('decline', `Friend request from ${declinedReq.from} was declined.`);
    },
    acceptRequest(requestId) {
      const acceptedRequest = this.myRequests.find((request) => request.id === requestId);
      this.myRequests = this.myRequests.filter((request) => request.id !== requestId);
      this.$emit('accept', `You and ${acceptedRequest.from} are now friends.`);
      this.$store.dispatch('friendInfo/acceptFriendRequest', { friendName: acceptedRequest.from });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.request-container {
  @extend .fl-between;
  padding-right: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid $gray;
}

div:nth-child(1) {
  span {
    font-family: $font-regular;
  }
}

div:nth-child(2) {
  span:nth-child(1) {
    margin-right: 5px;
  }
}

</style>
