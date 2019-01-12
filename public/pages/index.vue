<template lang="pug">
  b-jumbotron(header-level="4")
    template(slot="header") Welcome!
    template(slot="lead")
      p
        | This site is back-end for
        =" "
        b-link(href="https://auction.chvcm.ru" target="_blank") auction.chvcm.ru
        | .
      p
        | Created for
        =" "
        b-link(href="http://chvcm.ru" target="_blank") serious business
        =" "
        | with
        =" "
        font-awesome-icon(:icon="heartIcon")
        =" "
        | by
        =" "
        b-link(href="https://vk.com/alendo.studio" target="_blank") Alendo Studio
        = " "
        | (
        font-awesome-icon(:icon="githubAltIcon")
        =" "
        b-link(href="https://github.com/AlendoStudio" target="_blank") GitHub Profile
        | ) under
        =" "
        b-link(href="https://github.com/AlendoStudio/api.auction.chvcm.ru/blob/master/LICENSE" target="_blank") MIT Licence
        | .
    hr.my-4
    h5 Powered by free and open source technologies, such as:
    dl.row
      template(v-for="item in technologies")
        dt(:key="`dt.${item.title}`").col-md-2
          b-link(:href="item.to" target="_blank")
            font-awesome-icon(:icon="item.icon")
            =" "
            | {{ item.title }}
        dd(:key="`dd.${item.title}`").col-md-10 {{ item.description }}
    b-nav.justify-content-center
      b-nav-item(href="https://github.com/AlendoStudio/api.auction.chvcm.ru" target="_blank")
        font-awesome-icon(:icon="githubIcon")
        =" "
        | Source code
      b-nav-item(:href="apidocUrl" target="_blank")
        font-awesome-icon(:icon="bookIcon")
        =" "
        | Documentation
</template>

<script lang="js">
  import {faGithub, faGithubAlt, faNodeJs, faVuejs} from "@fortawesome/free-brands-svg-icons"
  import {
    faBook,
    faDatabase,
    faFeather,
    faFileCode,
    faHeart,
    faMemory,
    faRocket,
  } from "@fortawesome/free-solid-svg-icons";

  export default {
    computed: {
      apidocUrl() {
        return process.env.APIDOC_URL;
      },
      bookIcon() {
        return faBook;
      },
      githubAltIcon() {
        return faGithubAlt;
      },
      githubIcon() {
        return faGithub;
      },
      heartIcon() {
        return faHeart;
      },
    },
    data() {
      return {
        technologies: [
          {
            description: "Amazing JavaScript run-time environment with non-blocking asynchronous I/O operations.",
            icon: faNodeJs,
            title: "Node.js",
            to: "https://nodejs.org",
          }, {
            description: "Fast, unopinionated, minimalist web framework.",
            icon: faFeather,
            title: "Express.js",
            to: "https://expressjs.com",
          }, {
            description: "Library for realtime web applications.",
            icon: faRocket,
            title: "Socket.IO",
            to: "https://socket.io",
          }, {
            description: "Typed superset of JavaScript that compiles to plain JavaScript.",
            icon: faFileCode,
            title: "TypeScript",
            to: "https://www.typescriptlang.org",
          }, {
            description: "The world's most advanced open source relational database.",
            icon: faDatabase,
            title: "PostgreSQL",
            to: "https://www.postgresql.org",
          }, {
            description: "In-memory data structure store, used as a database, cache and message broker.",
            icon: faMemory,
            title: "Redis",
            to: "https://redis.io",
          }, {
            description: "The progressive JavaScript framework.",
            icon: faVuejs,
            title: "Vue.js",
            to: "https://vuejs.org",
          },
        ],
      };
    },
    head() {
      return {
        title: "Welcome",
      };
    },
    layout: "noContainer",
  }
</script>
