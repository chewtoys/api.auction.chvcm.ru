<template lang="pug">
  div.container.space-between-contents
    form
      fieldset(v-bind:disabled="isDisabled.form")
        div.form-group
          label(for="form.presets") Presets
          select(id="form.presets" v-model="preset").form-control
            optgroup(label="Utils")
              option(value="get /utils/ping") GET /utils/ping
              option(value="get /utils/limits") GET /utils/limits
              option(value="post /utils/password/check") POST /utils/password/check
              option(value="get /utils/password/reset") GET /utils/password/reset
              option(value="post /utils/password/reset") POST /utils/password/reset
            optgroup(label="Undocumented")
              option(value="custom") Custom
    div
      declarative-form-component(v-bind:form="form" v-bind:isDisabled="isDisabled" v-on:response="onResponse($event)")
</template>

<script lang="js">
  import DeclarativeFormComponent from "~/components/declarative-form.component.vue";

  export default {
    components: {
      DeclarativeFormComponent,
    },
    data() {
      return {
        form: {
          body: {},
          content: "json",
          headers: {},
          method: "get",
          params: {},
          path: "/",
          query: {},
          recaptcha: false,
        },
        isDisabled: {
          editor: false,
          form: false,
        },
        preset: "custom",
      };
    },
    head() {
      return {
        title: "Requester",
      };
    },
    layout: "requester",
    methods: {
      onResponse(body) {
        // TODO: code here!
      },
    },
    watch: {
      preset(newPreset) {
        this.isDisabled.editor = newPreset !== "custom";
        if (newPreset === "get /utils/ping") {
          this.form = {
            body: {},
            content: "json",
            headers: {},
            method: "get",
            params: {},
            path: "/utils/ping",
            query: {},
            recaptcha: false,
          };
        } else if (newPreset === "get /utils/limits") {
          this.form = {
            body: {},
            content: "json",
            headers: {},
            method: "get",
            params: {},
            path: "/utils/limits",
            query: {},
            recaptcha: false,
          };
        } else if (newPreset === "post /utils/password/check") {
          this.form = {
            body: {
              password: {
                label: "Password",
                value: {
                  data: "",
                  type: "text",
                },
              },
            },
            content: "json",
            headers: {},
            method: "post",
            params: {},
            path: "/utils/password/check",
            query: {},
            recaptcha: false,
          }
        } else if (newPreset === "get /utils/password/reset") {
          this.form = {
            body: {},
            content: "json",
            headers: {},
            method: "get",
            params: {},
            path: "/utils/password/reset",
            query: {
              email: {
                label: "Email",
                value: {
                  data: "",
                  type: "text",
                },
              },
            },
            recaptcha: true,
          }
        } else if (newPreset === "post /utils/password/reset") {
          this.form = {
            body: {
              password: {
                label: "Password",
                value: {
                  data: "",
                  type: "text",
                },
              },
            },
            content: "json",
            headers: {
              authorization: {
                label: "Authorization",
                value: {
                  data: "Bearer <token>",
                  type: "text",
                },
              },
            },
            method: "post",
            params: {},
            path: "/utils/password/reset",
            query: {},
            recaptcha: false,
          }
        }
      },
    },
  }
</script>
