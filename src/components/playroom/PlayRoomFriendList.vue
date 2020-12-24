<template>
  <div class="friend-container">
    <FriendList>
      <template v-slot:invite="{friendName}">
        <button @click="invite(friendName)" >
        <img :src="require('@/assets/img/plus.svg')" />
      </button>
      </template>
    </FriendList>
    <teleport to='body'>
      <transition name="message-slide">
      <div class="successful-message" v-if="successMessages.length > 0">
        {{displayedMessage}}
      </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import FriendList from '@/components/common/FriendList';

export default {
  name: 'PlayRoomFriendList',
  components: { FriendList },
  props: ['userName'],
  data() {
    return {
      successMessages: [],
    };
  },
  computed: {
    displayedMessage() {
      return this.successMessages[this.successMessages.length - 1];
    },
  },
  watch: {
    successMessages: {
      deep: true,
      handler(value) {
        if (value.length > 1) {
          this.successMessages.shift();
        } else if (value.length === 1) {
          setTimeout(() => {
            this.successMessages.shift();
          }, 5000);
        }
      },
    },
  },
  methods: {
    invite(friendName) {
      this.$store.getters['socket/getUserSocket'].emit('invite', { inviter: this.userName, friendName, roomId: this.$route.params.id });
      this.successMessages.push(`Invitation sent successfully to ${friendName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.friend-container {
  height: 100%;
  box-sizing: border-box;
  margin-top: 0;
}

button {
  background: transparent;
}

.successful-message {
  @extend .box-gray;
  @extend .fl-center;
  width: 30%;
  position: absolute;
  bottom: 2.5%;
  left: 70%;
  height: 3%;
}

.message-slide-enter-active, .message-slide-leave-active {
  transition: all 0.3s ease;
}

.message-slide-enter-from, .message-slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
