const path = require("path");

const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "public", ".env"),
});

module.exports = {
  head: {
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"},
    ],
    titleTemplate: '%s | api.auction.chvcm.ru',
  },
  mode: "spa",
  plugins: [
    "~/plugins/bootstrap.ts",
    "~/plugins/fontawesome.ts",
  ],
  rootDir: path.join(__dirname, "public"),
  router: {
    linkExactActiveClass: "active",
    mode: "hash",
  },
};
