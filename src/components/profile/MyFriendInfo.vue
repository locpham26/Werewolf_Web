<template>
  <div>
    <div class="switch-button-group">
      <button class="switch-button" :class="{inactive: selectedCmp !== 'my-friend-list'}"
      @click="selectComponent('my-friend-list')">
        Friend List
      </button>
      <button class="switch-button" :class="{inactive: selectedCmp !== 'my-request-list'}"
      @click="selectComponent('my-request-list')">
        Friend Requests
      </button>
    </div>
    <div>
      <component :is="selectedCmp" @unfriend='pushAction' @accept='pushAction'
      @decline='pushAction'>
      </component>
    </div>
    <div class='notification'>{{actions[actions.length-1]}}</div>
  </div>
</template>

<script>
import MyFriendList from './MyFriendList.vue';
import MyRequestList from './MyRequestList.vue';

export default {
  components: {
    MyFriendList,
    MyRequestList,
  },
  data() {
    return {
      selectedCmp: 'my-friend-list',
      actions: [],
    };
  },
  methods: {
    selectComponent(cmp) {
      this.selectedCmp = cmp;
    },
    pushAction(action) {
      this.actions.push(action);
    },
  },
  watch: {
    actions: {
      handler() {
        if (this.actions.length === 1) {
          setTimeout(() => {
            this.actions.splice(0, 1);
          }, 3000);
        } else if (this.actions.length > 1) {
          setTimeout(() => {
            this.actions = [];
          }, 5000);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.switch-button-group {
  @extend .fl-between;
  button {
    background: transparent;
    border: transparent;
    border-radius: 5px;
    color: $white;
    font-family: $font-bold;
    font-size: 1.5rem;
    margin-bottom: 20px;
    cursor: pointer;
    &:focus {
      outline: transparent;
    }
  }
}

.inactive {
  color: $light !important;
  opacity: 30%;
  &:hover {
    background: $light;
    color: $dark !important;
    opacity: 100% !important;
  }
}

.notification {
  font-family: $font-regular;
  margin-top: 20px;
  color: $yellow;
}

</style>
