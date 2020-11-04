<template>
  <div class="box-gray">
    <div class="title">My Profile</div>
    <my-info v-for="(item, key) in myInfo" :key="key" :field="key" :info="item"></my-info>
    <div>
      <button @click="selectComponent('friend-list')">Friend List</button>
      <button @click="selectComponent('request-list')">Request List</button>
    </div>
    <div v-if="selectedCmp==='friend-list'">
      <my-friend-list v-for="friend in myFriends" :key="friend.name">
        <template v-slot:friend>
          {{friend.name}}
        </template>
        <remove-button :property="friend.name" @remove='deleteFriend'></remove-button>
      </my-friend-list>
    </div>
    <div v-if="selectedCmp==='request-list'">
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
      ],
      myRequests: [
        { from: 'Jose', id: 1 },
        { from: 'Diago', id: 2 },
        { from: 'Pele', id: 3 },
      ],
      selectedCmp: '',
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
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-gray {
  width: 25rem;
  padding: 2rem;
}

.title {
  font-family: $font-bold;
  font-size: 3rem;
}
</style>
