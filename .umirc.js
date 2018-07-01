export default {
  plugins: [
    "umi-plugin-dva",
    [
      "umi-plugin-routes",
      {
        exclude: [/models/, /services/, /components/]
      }
    ]
  ],
  // pages: {
  //   "/": { document: "./src/index.ejs", context: { title: "home page" } }
  // },
  // html: {
  //   template: "./src/index.ejs"
  // },
  proxy: {
    "/api": {
      target: "http://127.0.0.1:9093/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  // exportStatic: {
  //   htmlSuffix: true
  // },

  hashHistory: false
  // hd: true
};
