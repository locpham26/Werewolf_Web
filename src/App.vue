<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: url("./assets/img/werewolf.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
