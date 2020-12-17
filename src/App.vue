<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/_base';
@import '@/assets/styles/_mixin';

#app {
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
  font-family: $font-regular;
  margin: 0;
}

html {
  height: 100%;
  width: 100%;
}

button {
  border: none;
  cursor: pointer;
  font-family: $font-bold;
  font-size: 1rem;
  @include transition(0.2s);
}

button:focus, input:focus {
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
