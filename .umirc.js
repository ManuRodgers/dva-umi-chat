export default {
  plugins: [
    "umi-plugin-dva",
    [
      "umi-plugin-routes",
      {
        exclude: [/models/, /services/]
      }
    ]
  ],
  // pages: {
  //   "/": { document: "./src/index.ejs", context: { title: "home page" } }
  // },
  html: {
    template: "./src/index.ejs"
  },
  proxy: {
    "/api": {
      target: "http://localhost:9093/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  hashHistory: false
  // hd: true
};
