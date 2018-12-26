<template lang="pug">
  div
    ul.nav.nav-tabs.justify-content-center
      li.nav-item
        a(href="#" v-bind:class="showEditor ? 'active': ''" v-on:click.prevent="showEditor = true").nav-link Editor
      li.nav-item
        a(href="#" v-bind:class="showEditor ? '': 'active'" v-on:click.prevent="showEditor = false").nav-link Form
    form(v-if="showEditor").space-between-contents
      fieldset(v-bind:disabled="isDisabled.editor || isDisabled.form")
        div.form-row
          div.form-group.col-md-2
            label(for="method") Method
            select(id="method" v-model="form.method").form-control
              option(value="get") GET
              option(value="post") POST
              option(value="put") PUT
              option(value="patch") PATCH
              option(value="delete") DELETE
          div(v-if="!withoutBody").form-group-col-md-2
            label(for="content") Content
            select(id="content" v-model="form.content").form-control
              option(value="json") Json
              option(value="bin") Bin
          div.form-group.col
            label(for="path") Path
            input(type="text" id="path" v-model="form.path").form-control
        div.form-group.form-check
          input(type="checkbox" id="recaptcha" v-model="form.recaptcha").form-check-input
          label(for="recaptcha").form-check-label reCAPTCHA v2
        div(v-for="section in ['headers', 'params', 'query', 'body']" v-bind:key="`editor.${section}`" v-if="!withoutBody && form.content === 'json' || section !== 'body'")
          h5 {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          div(v-for="(item, key) in form[section]" v-bind:key="`editor.${section}.${key}`").form-group
            label(v-bind:for="`editor.${section}.${key}.label`") Label for "{{ key }}"
            div.input-group
              input(type="text" v-bind:id="`editor.${section}.${key}.label`" v-model="item.label").form-control
              div.input-group-append
                button(type="button" v-on:click="removeKeyFromSection(section, key)").btn.btn-outline-secondary
                  i.fas.fa-minus
          div.form-group
            label(v-bind:for="`editor.newKeyInSection.${section}`") New key
            div.input-group
              input(type="text" v-bind:id="`editor.newKeyInSection.${section}`" v-model="newKeyInSection[section]").form-control
              div.input-group-append
                button(type="button" v-on:click="addKeyInSection(section)" v-bind:disabled="!newKeyInSection[section]").btn.btn-outline-secondary
                  i.fas.fa-plus
    div(v-if="!showEditor").space-between-contents
      form(v-on:submit.prevent="submitForm()")
        fieldset(v-bind:disabled="isDisabled.form")
          div(v-for="section in ['headers', 'params', 'query', 'body']" v-bind:key="`form.${section}`" v-if="(Object.keys(form[section] || {}).length) && (!withoutBody || section !== 'body')")
            h5 {{ section.charAt(0).toUpperCase() + section.slice(1) }}
            div(v-for="(item, key) in form[section]" v-bind:key="`form.${section}.${key}`")
              raw-input-component(v-model="item.value" v-bind:label="item.label" v-if="section !== 'body' || form.content === 'json'")
        vue-recaptcha(ref="recaptcha" v-bind:sitekey="recaptchaSite" v-on:verify="req.recaptcha = $event" v-on:expired="req.recaptcha = null" v-if="form.recaptcha")
        button(type="submit" v-bind:class="form.recaptcha ? 'space-between-contents' : ''").btn.btn-primary Submit
      div.space-between-contents
        highlight-code(lang="javascript" v-if="req.loading >= 0").pre-scrollable {{ highlightData }}
</template>

<script lang="js">
  import * as qs from "querystring";

  import axios from "axios";
  import * as _ from "lodash";
  import Vue from "vue";
  import * as MimeType from "whatwg-mimetype";

  import VueRecaptcha from "vue-recaptcha";
  import RawInputComponent from "~/components/raw-input.component.vue";

  export default {
    components: {
      RawInputComponent,
      VueRecaptcha,
    },
    computed: {
      withoutBody() {
        return ["get", "delete"].some((method) => method === this.form.method);
      },
      highlightData() {
        return [
          `// ${this.req.method.toUpperCase()} ${this.req.url}`,
          this.req.loading ? `\n// ${new Array(this.req.loading).fill(".").join("")}` : null,
          this.req.loading || !this.res.status ? null : `\n// Status: ${this.res.status}`,
          this.req.loading ? null : `\n\n${JSON.stringify(this.res.body, null, 2)}`,
        ].filter((v) => !!v).join("");
      },
    },
    data() {
      return {
        newKeyInSection: {
          body: "",
          headers: "",
          params: "",
          query: "",
        },
        recaptchaSite: process.env.RECAPTCHA_SITE,
        req: {
          loading: -1,
          method: null,
          recaptcha: null,
          url: null,
        },
        res: {
          body: null,
          status: null,
        },
        showEditor: true,
      };
    },
    methods: {
      addKeyInSection(section) {
        Vue.set(this.form[section], this.newKeyInSection[section], {
          label: "", // TODO: auto calculate label
          value: {
            data: "",
            type: "text",
          },
        });
        this.newKeyInSection[section] = "";
      },
      removeKeyFromSection(section, key) {
        Vue.delete(this.form[section], key);
      },
      generateAxiosConfig() {
        this.req.method = this.form.method;

        const queryObject = _.mapValues(this.form.query || {}, "value.data");
        if (this.withoutBody && this.form.recaptcha && this.req.recaptcha) {
          queryObject["g-recaptcha-response"] = this.req.recaptcha;
        }
        const query = qs.stringify(queryObject);

        let path = this.form.path;
        _.mapKeys(this.form.params || {}, (value, key) => path = path.replace(key, value.value.data));

        this.req.url = `${process.env.API_ENDPOINT}${path}${query ? `?${query}` : ""}`;

        const config = {
          headers: _.mapValues(this.form.headers || {}, "value.data"),
          maxContentLength: -1,
          method: this.req.method,
          responseType: "arraybuffer",
          url: this.req.url,
        };

        config.headers["content-type"] = this.form.content === "json" ? "application/json" : "application/octet-stream";

        if (!this.withoutBody && this.form.content === "json") {
          const body = _.mapValues(this.form.body || {}, "value.data");
          if (this.form.recaptcha && this.req.recaptcha) {
            body["g-recaptcha-response"] = this.req.recaptcha;
          }
          config.data = JSON.stringify(body);
        }

        return config;
      },
      parseResponse(data, contentType) {
        if (!contentType) {
          return null;
        }
        const mimeType = new MimeType(contentType);
        if (mimeType.essence === "application/json") {
          return JSON.parse(new TextDecoder(mimeType.parameters.get("charset") || "utf-8").decode(data));
        }
        return null;
      },
      async submitForm() {
        this.isDisabled.form = true;
        this.req.loading = 1;
        const intervalHandler = setInterval(() => {
          this.req.loading++;
          if (this.req.loading > 4) {
            this.req.loading = 1;
          }
        }, 100);
        try {
          const res = await axios(this.generateAxiosConfig());
          this.res.status = `${res.status} ${res.statusText}`;
          this.res.body = this.parseResponse(res.data, res.headers["content-type"]);
          this.$emit("response", this.res.body);
        } catch (error) {
          console.error(error);
          this.res.status = error.response ? `${error.response.status} ${error.response.statusText}` : null;
          this.res.body = error.response && this.parseResponse(error.response.data, error.response.headers["content-type"]) || error.message;
        } finally {
          clearInterval(intervalHandler);
          this.req.loading = 0;
          this.isDisabled.form = false;
          this.req.recaptcha = null;
          if (this.form.recaptcha) {
            this.$refs.recaptcha.reset();
          }
        }
      },
    },
    props: ["form", "isDisabled"],
    watch: {
      showEditor() {
        this.req.recaptcha = null;
      },
      "form.recaptcha"() {
        this.req.recaptcha = null;
      },
    },
  }
</script>
