<template>
  <button :disabled='disableButton' :class="{disable: disableButton}" @click="resendEmail()">
    Resend
  </button>
</template>

<script>
export default {
  props: ['email'],
  data() {
    return {
      disableButton: false,
    };
  },
  methods: {
    resendEmail() {
      console.log(`Resending to ${this.email}`);
      this.disableButton = true;
      setTimeout(() => {
        this.disableButton = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

button {
  background: none;
  border: none;
  outline: none;
  border-radius: 5px;
  color: $white;
  text-align: left;
  font-family: $font-bold;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: $light;
    color: $dark;
  }
}

.disable {
  opacity: 50%;
  cursor: not-allowed;
  background: none !important;
  color: $white !important;
}
</style>
