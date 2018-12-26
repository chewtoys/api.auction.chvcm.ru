<template lang="pug">
  nav.navbar.navbar-expand-md.navbar-dark.bg-dark.sticky-top
    nuxt-link.navbar-brand(to="/") API
    button.navbar-toggler(type="button" data-toggle="collapse" v-bind:data-target="navbarIdSelector")
      i.fas.fa-bars
    div.collapse.navbar-collapse(v-bind:id="navbarId")
      ul.navbar-nav
        li.nav-item.dropdown(v-bind:class="setActiveClass('^/requester.*$')")
          nuxt-link.nav-link(to="/requester")
            i.fas.fa-user-astronaut
            =" "
            | Requester
</template>

<script lang="js">
  import * as cuid from "cuid";

  export default {
    computed: {
      navbarIdSelector() {
        return `#${this.navbarId}`;
      },
    },
    data() {
      return {
        navbarId: cuid(),
      };
    },
    methods: {
      setActiveClass(regex) {
        return {
          active: this.$route.path.match(regex),
        };
      },
    },
  };
</script>
