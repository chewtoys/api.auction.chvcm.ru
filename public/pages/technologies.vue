<template lang="pug">
  div
    div.jumbotron
      h1.display-4 Technologies
      p.lead Powered by free and open source technologies, such as:
      hr.my-4
      ul.nav.nav-pills
        li.nav-item
          router-link(to="/").nav-link
            i.fas.fa-caret-left
            =" "
            | Back
        li.nav-item
          nuxt-link(to="/technologies/nodejs").nav-link
            i.fab.fa-node-js
            =" "
            | Node.js
        li.nav-item
          nuxt-link(to="/technologies/express").nav-link
            i.fas.fa-network-wired
            =" "
            | Express.js
        li.nav-item
          nuxt-link(to="/technologies/typescript").nav-link
            i.fab.fa-js-square
            =" "
            | TypeScript
        li.nav-item
          nuxt-link(to="/technologies/postgres").nav-link
            i.fas.fa-database
            =" "
            | PostgreSQL
        li.nav-item
          nuxt-link(to="/technologies/redis").nav-link
            i.fas.fa-memory
            =" "
            | Redis
        li.nav-item
          nuxt-link(to="/technologies/frontend").nav-link
            i.fab.fa-vuejs
            =" "
            | Front-end
    div.container-fluid
      nuxt-child
</template>

<script lang="js">
  export default {
    head() {
      return {
        title: "Technologies",
      };
    },
  };
</script>
