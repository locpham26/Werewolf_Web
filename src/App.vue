<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/_base';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  @extend .fl-center
}

body {
  height: 100%;
  width: 100%;
  background: url("./assets/img/werewolf.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

html {
  height: 100%;
  width: 100%;
}

input {
  border: none;
}

input:focus {
  outline: none;
}

@font-face {
  font-family: 'Berlin Sans FB Demi Bold';
  src: url('./assets/fonts/Berlin\ Sans\ FB\ Demi\ Bold.ttf');
}
@font-face {
  font-family: 'Berlin Sans FB Regular';
  src: url('./assets/fonts/Berlin\ Sans\ FB\ Regular.ttf');
}
</style>
