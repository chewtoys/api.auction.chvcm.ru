<template lang="pug">
  b-form
    fieldset(:disabled="disabled")
      b-form-group(v-for="item in dictionary" :key="item.id")
        b-input-group
          b-input-group-prepend
            b-btn(size="sm" variant="outline-secondary" @click="item.enabled = !item.enabled")
              font-awesome-icon(:icon="item.enabled ? eyeIcon : eyeSlashIcon")
          b-input(type="text" size="sm" :readonly="!allowEdit" v-model="item.key" placeholder="Key").restored-form-control-border-radius-right
          b-input(type="text" size="sm" v-model="item.value" placeholder="Value").ml-2.restored-form-control-border-radius-left
          b-input-group-append
            b-btn(size="sm" variant="outline-secondary" :disabled="!allowEdit" @click="deleteItemById(item.id)")
              font-awesome-icon(:icon="minusIcon")
      fieldset(:disabled="!allowEdit")
        b-form-group
          b-input-group
            b-input-group-prepend
              b-btn(size="sm" variant="outline-secondary" @click="enabled = !enabled")
                font-awesome-icon(:icon="enabled ? eyeIcon : eyeSlashIcon")
            b-input(type="text" size="sm" v-model="key" placeholder="New key").restored-form-control-border-radius-right
            b-input(type="text" size="sm" v-model="value" placeholder="Value").ml-2.restored-form-control-border-radius-left
            b-input-group-append
              b-btn(size="sm" variant="outline-secondary" @click="addItem()")
                font-awesome-icon(:icon="plusIcon")
</template>

<script lang="js">
  import {
    faEye,
    faEyeSlash,
    faMinus,
    faPlus,
  } from "@fortawesome/free-solid-svg-icons";
  import * as cuid from "cuid";

  export default {
    computed: {
      eyeIcon() {
        return faEye;
      },
      eyeSlashIcon() {
        return faEyeSlash;
      },
      minusIcon() {
        return faMinus;
      },
      plusIcon() {
        return faPlus;
      },
    },
    data() {
      return {
        enabled: true,
        key: "",
        value: "",
      };
    },
    methods: {
      addItem() {
        this.dictionary.push({
          enabled: this.enabled,
          id: cuid(),
          key: this.key,
          value: this.value,
        });
        this.key = "";
        this.value = "";
      },
      deleteItemById(id) {
        const index = this.dictionary.findIndex((x) => x.id === id);
        this.dictionary.splice(index, 1);
      },
    },
    props: {
      allowEdit: {
        required: true,
        type: Boolean,
      },
      dictionary: {
        required: true,
        type: Array,
      },
      disabled: {
        required: true,
      },
    },
  }
</script>

<style lang="css" scoped>
  .restored-form-control-border-radius-left {
    border-top-left-radius: 0.25rem !important;
    border-bottom-left-radius: 0.25rem !important;
  }

  .restored-form-control-border-radius-right {
    border-top-right-radius: 0.25rem !important;
    border-bottom-right-radius: 0.25rem !important;
  }
</style>
