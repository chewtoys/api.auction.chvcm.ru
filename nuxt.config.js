const path = require("path");

const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "public", ".env"),
});

const constSharedJson = require(path.join(__dirname, "src", "const-shared.json"));

module.exports = {
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
    "highlight.js/styles/vs2015.css",
    "~/css/main.css",
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
    color: "white",
  },
  mode: "spa",
  plugins: [
    "~/plugins/bootstrap.js",
    "~/plugins/highlight.js"
  ],
  router: {
    linkExactActiveClass: "active",
    mode: "hash",
  },
  srcDir: "public",
};
