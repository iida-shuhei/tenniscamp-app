module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "テニス合宿選手権",
    },
  },
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 8888,
    disableHostCheck: true,
  },
}