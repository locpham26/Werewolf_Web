<template>
  <div class="box-dark d-fl">
    <div class="chat-container" v-if="activeChannel === 'all'">
      <div v-for="(mess, i) in generalMessages" :key="i">
        <PlayRoomChatboxItem :name="mess.userName" :message="mess.text"
        :isMyMessage="userInfo.name === mess.userName" />
      </div>
    </div>
    <div class="chat-container" v-else>
      <div v-for="(mess, i) in wolfMessages" :key="i">
        <PlayRoomChatboxItem :name="mess.userName" :message="mess.text"
        :isMyMessage="userInfo.name === mess.userName" :isFromWolf="mess.isFromWolf" />
      </div>
    </div>
    <div class="chatbox-input d-fl">
      <select class="box-gray" v-show="isGameStarted" v-model="activeChannel"
      :class="{'wolf': activeChannel === 'wolf'}">
        <option
          v-for="channel in availableChannel"
          :key="channel"
          :value="channel"
          v-show="checkWolfChannel(channel)"
        >
          {{ channel }}
        </option>
      </select>
      <input type="text" class="box-gray" @keydown="send" required v-model="sentMessage"/>
    </div>
  </div>
</template>

<script>
import PlayRoomChatboxItem from './PlayRoomChatboxItem';

export default {
  name: 'PlayRoomChatbox',
  components: { PlayRoomChatboxItem },
  props: ['messages', 'sendMessage', 'isGameStarted', 'userInfo'],
  data() {
    return {
      sentMessage: '',
      availableChannel: ['all', 'wolf'],
      activeChannel: 'all',
    };
  },
  computed: {
    wolfMessages() {
      return this.messages.filter((message) => message.isFromWolf === true);
    },
    generalMessages() {
      return this.messages.filter((message) => message.isFromWolf === false);
    },
  },
  methods: {
    send(e) {
      if (e.keyCode === 13) {
        if (this.activeChannel === 'all') {
          this.sendMessage(this.sentMessage, false);
        } else {
          this.sendMessage(this.sentMessage, true);
        }
        this.sentMessage = '';
      }
    },
    checkWolfChannel(channel) {
      return channel !== 'wolf' || (channel === 'wolf' && this.userInfo.role === 'wolf');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-dark {
  width: 25%;
  // min-height: 28rem;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
}

.chat-container {
  height: 25rem;
  overflow-y: auto;
}

.chatbox-input {
  margin-bottom: 10px;
}

select {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  font-family: $font-regular;
  color: $yellow !important;
  text-transform: uppercase;
  flex-shrink: 0;
  cursor: pointer;
}

.wolf {
  color: $red !important;
}

select > option {
  font-family: $font-regular;
  text-transform: uppercase;
  color: $white;
}

input {
  width: 100%;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  box-shadow: 0;
  border: 0.5px solid rgb(133, 133, 133) !important;
  border-left: none !important;
}

select:active, select:focus {
  outline: none;
  background: $gray;
}
</style>
