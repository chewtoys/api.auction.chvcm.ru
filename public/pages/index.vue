<template lang="pug">
  div.jumbotron
    h1.display-4 Welcome!
    p.lead
      | This site is back-end for
      =" "
      a(href="https://auction.chvcm.ru" target="_blank") auction.chvcm.ru
      | .
    p.lead
      | Created for
      =" "
      a(href="http://chvcm.ru" target="_blank") serious business
      =" "
      i.fas.fa-hand-holding-usd
      =" "
      | with
      =" "
      i.fas.fa-heart
      =" "
      | by
      =" "
      a(href="https://vk.com/alendo.studio" target="_blank") Alendo Studio
      =" "
      | (
      i.fab.fa-github-alt
      =" "
      a(href="https://github.com/AlendoStudio" target="_blank") GitHub Profile
      | ) under
      =" "
      a(href="https://github.com/AlendoStudio/api.auction.chvcm.ru/blob/master/LICENSE" target="_blank") MIT licence
      | .
    hr.my-4
    ul.nav
      li.nav-item
        nuxt-link(to="/technologies" role="button").nav-link
          i.fas.fa-drafting-compass
          =" "
          | Technologies
      li.nav-item
        a(href="https://github.com/AlendoStudio/api.auction.chvcm.ru").nav-link
          i.fab.fa-github
          =" "
          | Source code
      li.nav-item
        a(href="https://github.com/AlendoStudio/api.auction.chvcm.ru/wiki").nav-link
          i.fas.fa-book
          =" "
          | Documentation
</template>

<script lang="js">
  export default {
    head() {
      return {
        title: "Welcome",
      };
    },
  };
</script>
