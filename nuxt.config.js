const path = require("path");

const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "public", ".env"),
});

const constSharedJson = require(path.join(__dirname, "src", "const-shared.json"));

module.exports = {
  build: {
    babel: {
      plugins: ["@babel/plugin-syntax-dynamic-import"],
      presets: ["@babel/preset-env"],
    },
  },
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT || constSharedJson.API_MOUNT_POINT,
    RECAPTCHA_SITE: process.env.RECAPTCHA_SITE,
  },
  generate: {
    dir: "build",
  },
  head: {
    link: [
      {rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon"}
    ],
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"},
    ],
    titleTemplate: "%s | api.auction.chvcm.ru",
  },
  loading: {
    color: "#FF8C00",
  },
  mode: "spa",
  modules: [
    "bootstrap-vue/nuxt",
  ],
  plugins: [
    "~/plugins/fontawesome.js",
  ],
  router: {
    linkExactActiveClass: "active",
    mode: "hash",
  },
  srcDir: "public",
};
