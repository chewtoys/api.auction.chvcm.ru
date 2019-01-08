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
    head: {
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
          async: "",
          body: true,
          defer: "",
        },
      ],
    },
  }
</script>
