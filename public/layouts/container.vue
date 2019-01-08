<template lang="pug">
  div
    navbar-component
    b-container(fluid).mt-3
      nuxt
</template>

<script lang="js">
  import NavbarComponent from "~/components/navbar.component.vue";

  export default {
    components: {
      NavbarComponent,
    },
  }
</script>
