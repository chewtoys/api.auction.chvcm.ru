<template lang="pug">
  b-navbar(toggleable="md" type="dark" variant="dark")
    nuxt-link(to="/").navbar-brand API
    b-navbar-toggle(target="nav_collapse")
      font-awesome-icon(:icon="barsIcon")
    b-collapse(is-nav id="nav_collapse")
      b-navbar-nav
        nav-item-component(to="/requester" :active="!!$route.path.match('^/requester.*$')")
          font-awesome-icon(:icon="userAstronautIcon")
          =" "
          | Requester
        nav-item-component(to="/listener" :active="!!$route.path.match('^/listener.*$')")
          font-awesome-icon(:icon="userGraduateIcon")
          =" "
          | Listener
        nav-item-component(to="/environment" :active="!!$route.path.match('^/environment.*$')")
          font-awesome-icon(:icon="userCogIcon")
          =" "
          | Environment
</template>

<script lang="js">
  import {
    faBars,
    faUserAstronaut,
    faUserCog,
    faUserGraduate,
  } from "@fortawesome/free-solid-svg-icons";

  import NavItemComponent from "~/components/navItem.component.vue";

  export default {
    components: {
      NavItemComponent,
    },
    computed: {
      barsIcon() {
        return faBars;
      },
      userAstronautIcon() {
        return faUserAstronaut;
      },
      userCogIcon() {
        return faUserCog;
      },
      userGraduateIcon() {
        return faUserGraduate;
      },
    },
  }
</script>
