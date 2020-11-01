module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/_variables',
      },
    },
  },
};
