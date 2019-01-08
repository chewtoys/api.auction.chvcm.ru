<template lang="pug">
  li(:class="setNavItemClass()").nav-item
    nuxt-link(:to="to").nav-link
      slot
</template>

<script>
  export default {
    methods: {
      setNavItemClass() {
        return {
          active: this.active,
        };
      },
    },
    props: {
      active: {
        default: false,
        type: Boolean,
      },
      to: {
        required: true,
        type: String,
      },
    },
  }
</script>
