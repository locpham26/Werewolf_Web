<template>
  <div class="box-gray">
    <div class="title">My Profile</div>
    <my-info v-for="(item, key) in myInfo" :key="key" :field="key" :info="item"></my-info>
    <div class="button-group">
      <button class="select-button" :class="{inactive: selectedCmp !== 'friend-list'}"
      @click="selectComponent('friend-list')">
        Friend List
      </button>
        <button class="select-button" :class="{inactive: selectedCmp !== 'request-list'}"
        @click="selectComponent('request-list')">
          Request List
          <div v-show="showBadge" class="request-badge">{{myRequests.length}}</div>
        </button>
    </div>
      <div class="list-container" v-if="selectedCmp==='friend-list'">
        <my-friend-list v-for="friend in myFriends" :key="friend.name">
          <template v-slot:friend>
            {{friend.name}}
          </template>
          <remove-button :property="friend.name" @remove='deleteFriend'></remove-button>
        </my-friend-list>
      </div>
      <div class="list-container" v-if="selectedCmp==='request-list'">
        <my-request-list v-for="request in myRequests" :key="request.id">
          {{request.from}}
          <template v-slot:accept>
            <accept-button :property="request.id" @accept='acceptRequest'></accept-button>
          </template>
          <template v-slot:remove>
            <remove-button :property="request.id" @remove='deleteRequest'></remove-button>
          </template>
        </my-request-list>
      </div>
  </div>
</template>

<script>
import MyInfo from './MyInfo.vue';
import MyFriendList from './MyFriendList.vue';
import MyRequestList from './MyRequestList.vue';
import RemoveButton from './RemoveButton.vue';
import AcceptButton from './AcceptButton.vue';

export default {
  components: {
    MyInfo,
    MyFriendList,
    MyRequestList,
    RemoveButton,
    AcceptButton,
  },
  data() {
    return {
      myInfo: {
        username: 'Loc',
        email: 'loc@domain.com',
        password: 'Loc123',
      },
      myFriends: [
        { name: 'Andy' },
        { name: 'George' },
        { name: 'Sharp' },
        { name: 'Sharp1' },
        { name: 'Sharp2' },
        { name: 'Sharp3' },
        { name: 'Sharp4' },
        { name: 'Sharp5' },
        { name: 'Sharp6' },
        { name: 'Sharp7' },
        { name: 'Sharp8' },
        { name: 'Sharp9' },
      ],
      myRequests: [
        { from: 'Jose', id: 1 },
        { from: 'Diago', id: 2 },
        { from: 'Pele', id: 4 },
        { from: 'Pele2', id: 5 },
        { from: 'Pele3', id: 6 },
        { from: 'Pele4', id: 7 },
        { from: 'Pele5', id: 8 },
        { from: 'Pele6', id: 9 },
        { from: 'Pele7', id: 10 },
        { from: 'Pele8', id: 11 },
      ],
      selectedCmp: 'friend-list',
    };
  },
  methods: {
    selectComponent(cmp) {
      this.selectedCmp = cmp;
    },
    deleteFriend(friendName) {
      this.myFriends = this.myFriends.filter((friend) => friend.name !== friendName);
    },
    deleteRequest(requestId) {
      this.myRequests = this.myRequests.filter((request) => request.id !== requestId);
    },
    acceptRequest(requestId) {
      const acceptedRequest = this.myRequests.find((request) => request.id === requestId);
      this.myRequests = this.myRequests.filter((request) => request.id !== requestId);
      this.myFriends.push({ name: acceptedRequest.from });
    },
  },
  computed: {
    showBadge() {
      return this.myRequests.length > 0 && this.selectedCmp !== 'request-list';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-gray {
  width: 25rem;
  padding: 2rem;
  height: 20rem;
}

.title {
  font-family: $font-bold;
  font-size: 3rem;
}

.button-group {
  @extend .fl-space;
  margin-top: 20px;
  button {
    background: transparent;
    border: transparent;
    border-radius: 5px;
    color: $white;
    font-family: $font-bold;
    font-size: 1.5rem;
    margin-bottom: 10px;
    cursor: pointer;
    &:focus {
      outline: transparent;
    }
  }
}

.inactive {
  color: $gray !important;
  &:hover {
    background: $light;
    color: $dark !important;
  }
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

.list-container {
  width: 100%;
  height: 10rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: $dark;
  }
  &::-webkit-scrollbar-thumb {
    background: $light;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: $white;
  }
}

</style>
