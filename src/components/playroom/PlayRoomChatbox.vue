<template>
  <div class="box-dark d-fl"
    :style="{width: isGameStarted ? '35%' : '18%'}"
  >
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
      <select class="box-gray" v-model="activeChannel"
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
  props: ['isGameStarted', 'userInfo'],
  data() {
    return {
      wolfMessages: [],
      generalMessages: [],
      sentMessage: '',
      availableChannel: ['all', 'wolf'],
      activeChannel: 'all',
    };
  },
  methods: {
    send(e) {
      if (e.keyCode === 13 && this.sentMessage !== '') {
        if (this.activeChannel === 'all') {
          this.sendMessage(this.sentMessage, false);
        } else {
          this.sendMessage(this.sentMessage, true);
        }
        this.sentMessage = '';
      }
    },
    sendMessage(sentMessage, isFromWolf) {
      this.$store.getters['socket/getUserSocket'].emit('sendMessage', {
        userName: this.userInfo.name,
        text: sentMessage,
        isFromWolf,
        roomId: this.$route.params.id,
      });
    },
    checkWolfChannel(channel) {
      return channel !== 'wolf' || (channel === 'wolf' && this.userInfo.role === 'wolf');
    },
  },
  watch: {
    isGameStarted(value) {
      if (!value) {
        this.activeChannel = 'all';
        this.wolfMessages = [];
      }
    },
  },
  mounted() {
    this.$store.getters['socket/getUserSocket'].on('message', (message) => {
      if (message.isFromWolf) {
        this.wolfMessages.push(message);
      } else {
        this.generalMessages.push(message);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.box-dark {
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
  font-size: 0.9rem;
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
