<template>
  <div class="info-container">
    <div v-for="(item, key) in myInfo" :key="key" class="field-container">
      <span>{{key}}</span>
      <span v-if="!editingInfo">{{item.curVal}}</span>
      <input v-else v-model="item.pendingVal" type="text" :readonly="!editingInfo"
      :class="{editing: editingInfo}" :placeholder="item.curVal" />
    </div>
    <div v-if="!editingInfo">
      <button @click="openEditing" class="change-button" >
      Change Info
      </button>
    </div>
    <div v-else>
      <button @click="saveEditing" class="apply-button">Apply</button>
      <button @click="cancelEditing" class="cancel-button">Cancel</button>
    </div>
    <div>
      {{myInfo.username.pendingVal}}
      {{myInfo.email.pendingVal}}
      {{myInfo.password.pendingVal}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myInfo: {
        username: { curVal: 'Loc', pendingVal: '' },
        email: { curVal: 'loc@domain.com', pendingVal: '' },
        password: { curVal: 'Loc123', pendingVal: '' },
      },
      editingInfo: false,
    };
  },
  methods: {
    openEditing() {
      this.editingInfo = true;
    },
    cancelEditing() {
      this.editingInfo = false;
      this.resetInput();
    },
    saveEditing() {
      this.editingInfo = false;
      Object.keys(this.myInfo).forEach((key) => {
        this.myInfo[key].curVal = this.myInfo[key].pendingVal;
      });
      this.resetInput();
    },
    resetInput() {
      Object.keys(this.myInfo).forEach((key) => {
        this.myInfo[key].pendingVal = '';
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.info-container {
  color: $white;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  font-size: 1rem;
  span {
    font-family: $font-bold;
    margin-right: 10px;
    text-transform: capitalize;
  }
}

.field-container {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

input {
  font-family: $font-regular;
  color: $white;
}

.apply-button,
.change-button {
  text-align: center !important;
  background: none;
  border: none;
  outline: none;
  border-radius: 5px;
  margin-top: 20px;
  color: $white;
  font-family: $font-bold;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background: $light;
    color: $dark;
  }
}

.cancel-button {
  @extend .change-button;
  margin-left: 10px;
}

.editing {
  color: $dark;
  background: $light;
  border-radius: 3px;
}

</style>
