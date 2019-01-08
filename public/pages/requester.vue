<template lang="pug">
  div
    b-modal(id="qrCode" title="QR Code")
      div.text-center
        vue-qrcode(:value="res.helpers.qrCode" :options="{margin: 0, scale: 5}")
    b-form
      fieldset(:disabled="res.isSubmit")
        b-input-group
          b-input-group-prepend
            b-form-select(size="sm" :options="presetGroupOptions" v-model="presetGroup")
            b-form-select(size="sm" :options="methodOptions" v-model="req.method" v-if="isCustomPreset").ml-2
            b-form-select(size="sm" :options="contentTypeOptions" v-model="req.contentType" v-if="isCustomPreset && isWithBody").ml-2
          b-form-select(size="sm" :options="presetOptions" v-model="preset" v-if="!isCustomPreset").ml-2.restored-form-control-border-radius
          b-input(type="text" size="sm" v-model="req.path" v-if="isCustomPreset").ml-2.restored-form-control-border-radius
    b-row.mt-3
      b-col(md="2")
        b-nav(vertical pills fill)
          b-nav-item(v-for="item in requestTabOptions" :key="item.value" :active="item.value === requestTab" @click="requestTab = item.value") {{ item.text }}
          b-btn(variant="link" :disabled="!isCustomPreset || res.isSubmit" @click="isCustomPreset && (req.recaptcha = !req.recaptcha)").nav-link
            font-awesome-icon(:icon="reCaptchaToggleIcon")
            =" "
            | reCaptcha v2
      b-col(md="10")
        template(v-if="requestTab === 'form'")
          b-form(@submit.prevent="onSubmit()")
            fieldset(:disabled="res.isSubmit")
              raw-input-component(v-for="item in req.body" :key="item.key" :label="item.key" v-model="item.value" v-if="isWithBody && req.contentType === 'json'")
              b-form-group(v-if="isWithBody && req.contentType === 'binary'")
                b-form-file(:placeholder="fileInputLabel" v-model="req.body")
              ace-editor(mode="json" theme="monokai" width="100%" height="100px" :readOnly="res.isSubmit" :fontSize="14" :minLines="10" :maxLines="Infinity" :editorProps="{$blockScrolling: Infinity}" :value="req.body" :onChange="onAceEditorChange" v-if="isWithBody && req.contentType === 'json-raw'").mb-3
              vue-recaptcha(ref="recaptcha" v-bind:sitekey="recaptchaSite" v-on:verify="recaptchaToken = $event" v-on:expired="recaptchaToken = null" v-if="req.recaptcha").mb-3
              b-btn(type="submit" variant="primary").mb-3
                template(v-if="res.isSubmit")
                  font-awesome-icon(:icon="spinnerIcon" spin)
                  =" "
                  | Submit
                template(v-else) Submit
              b-btn(type="button" variant="success" @click="saveResponse()" v-if="isResBodyAreArrayBuffer").mb-3.ml-2
                font-awesome-icon(:icon="downloadIcon")
                =" "
                | Response
              b-btn(type="button" variant="success" v-b-modal.qrCode v-if="res.helpers.qrCode").mb-3.ml-2
                font-awesome-icon(:icon="qrCodeIcon")
                =" "
                | QR Code
              ace-editor(name="ace.response" mode="javascript" theme="monokai" width="100%" height="100px" :readOnly="true" :fontSize="14" :minLines="10" :maxLines="Infinity" :editorProps="{$blockScrolling: Infinity}" :value="responseData").mb-3
        template(v-if="requestTab === 'params'")
          key-value-editor-component(:allowEdit="isCustomPreset" :dictionary="req.params" :disabled="res.isSubmit" :key="requestTab")
        template(v-if="requestTab === 'query'")
          key-value-editor-component(:allowEdit="isCustomPreset" :dictionary="req.query" :disabled="res.isSubmit" :key="requestTab")
        template(v-if="requestTab === 'headers'")
          key-value-editor-component(:allowEdit="isCustomPreset" :dictionary="req.headers" :disabled="res.isSubmit" :key="requestTab")
</template>

<script lang="js">
  import {
    faDownload,
    faLock,
    faQrcode,
    faSpinner,
    faUnlock,
  } from "@fortawesome/free-solid-svg-icons";

  import VueQrcode from "@chenfengyuan/vue-qrcode";
  import axios from "axios";
  import * as cuid from "cuid";
  import {saveAs} from "file-saver";
  import * as prettyMs from "pretty-ms";
  import qs from "qs";
  import VueRecaptcha from "vue-recaptcha";
  import {Ace as AceEditor} from "vue2-brace-editor";
  import * as MimeType from "whatwg-mimetype";

  import "brace/mode/javascript";
  import "brace/mode/json";
  import "brace/theme/monokai";

  import KeyValueEditorComponent from "~/components/keyValueEditor.component.vue";
  import RawInputComponent from "~/components/rawInput.component.vue";

  import {
    authToken,
    baseUrl,
    purgatoryToken,
    setAuthToken,
    setPurgatoryToken,
  } from "../lib/localStorage";

  import presets from "../lib/requesterPresets.json";

  export default {
    components: {
      AceEditor,
      KeyValueEditorComponent,
      RawInputComponent,
      VueQrcode,
      VueRecaptcha,
    },
    computed: {
      bodyAsJson() {
        const result = {};
        for (const item of this.req.body) {
          result[item.key] = item.value.data;
        }
        return result;
      },
      contentTypeOptions() {
        return [
          {text: "Json", value: "json-raw"},
          {text: "Binary", value: "binary"},
        ];
      },
      downloadIcon() {
        return faDownload;
      },
      fileInputLabel() {
        return this.req.body instanceof File ? this.req.body.name : "Choose a file...";
      },
      isCustomPreset() {
        return this.presetGroup === "custom";
      },
      isResBodyAreArrayBuffer() {
        return this.res.body instanceof ArrayBuffer;
      },
      isWithBody() {
        return this.req.method !== "get" && this.req.method !== "delete";
      },
      methodOptions() {
        return ["get", "post", "put", "patch", "delete"].map((m) => ({text: m.toUpperCase(), value: m}));
      },
      presetGroupOptions() {
        return [
          ...Object.keys(presets).map((g) => ({text: g, value: g})),
          {text: "Custom", value: "custom"},
        ];
      },
      presetOptions() {
        if (this.isCustomPreset) {
          return [];
        }
        return Object.keys(presets[this.presetGroup]).map((p) => ({text: p, value: p}));
      },
      qrCodeIcon() {
        return faQrcode;
      },
      reCaptchaToggleIcon() {
        return this.req.recaptcha ? faLock : faUnlock;
      },
      responseData() {
        return this.res.isSubmit === null ? `// Press "Submit" to view response\n` :
          [
            `// ${this.res.method.toUpperCase()} ${this.res.url}`,
            this.res.isSubmit ? null : `\n// Status: ${this.res.status}`,
            this.res.isSubmit ? null : `\n// Time: ${prettyMs(this.res.time, {separateMs: true})}`,
            this.res.isSubmit || this.res.body === undefined || this.res.body instanceof ArrayBuffer ? null : `\n\n${JSON.stringify(this.res.body, null, 2)}`,
            "\n"
          ].filter((v) => !!v).join("");
      },
      requestTabOptions() {
        return [
          {text: "Form", value: "form"},
          {text: "Params", value: "params"},
          {text: "Query", value: "query"},
          {text: "Headers", value: "headers"},
        ];
      },
      spinnerIcon() {
        return faSpinner
      },
    },
    data() {
      return {
        preset: null,
        presetGroup: "custom",
        recaptchaSite: process.env.RECAPTCHA_SITE,
        recaptchaToken: null,
        req: {
          body: "",
          contentType: "json-raw",
          headers: [],
          method: "get",
          params: [],
          path: "/",
          query: [],
          recaptcha: false,
        },
        requestTab: "form",
        res: {
          body: undefined,
          helpers: {
            fileName: undefined,
            qrCode: undefined,
          },
          isSubmit: null,
          method: "",
          status: "",
          time: 0,
          url: "",
        },
      };
    },
    head() {
      return {
        title: "Requester",
      };
    },
    layout: "containerRecaptcha",
    methods: {
      afterSubmit() {
        if (!this.res.body) {
          return;
        }
        if (this.preset === "POST /entities" || this.preset === "PUT /signin") {
          setAuthToken(this.res.body.token);
          setPurgatoryToken();
        }
        if (this.preset === "POST /signin") {
          if (this.res.body.tfa) {
            setPurgatoryToken(this.res.body.token);
            setAuthToken();
          } else {
            setAuthToken(this.res.body.token);
            setPurgatoryToken();
          }
        }
        if (this.preset === "PUT /user/tfa/otp" && this.res.body.keyuri) {
          this.res.helpers.qrCode = this.res.body.keyuri;
        }
      },
      generateAxiosConfig() {
        this.res.method = this.req.method;
        this.res.url = this.req.path;
        this.req.params
          .filter((param) => param.enabled)
          .map((param) => {
            if (this.preset === "GET /entities/:id/attachments/:name" && param.key === ":name") {
              this.res.helpers.fileName = param.value;
            }
            this.res.url = this.res.url.replace(param.key, encodeURIComponent(param.value));
          });

        const config = {
          baseURL: baseUrl() || process.env.API_ENDPOINT,
          headers: {
            ...this.keyValueToObject(this.req.headers),
            "content-type": this.req.contentType.startsWith("json") ? "application/json" : "application/octet-stream",
          },
          maxContentLength: -1,
          method: this.req.method,
          params: this.keyValueToObject(this.req.query),
          paramsSerializer(params) {
            return qs.stringify(params);
          },
          responseType: "arraybuffer",
          url: this.res.url,
        };

        for (const key in config.headers) {
          if (!config.headers.hasOwnProperty(key)) {
            continue;
          }
          config.headers[key] = config.headers[key].replace("{{authToken}}", authToken());
          config.headers[key] = config.headers[key].replace("{{purgatoryToken}}", purgatoryToken());
        }

        if (this.isWithBody) {
          if (this.req.contentType === "json") {
            config.data = this.bodyAsJson;
          }
          if (this.req.contentType === "json-raw") {
            config.data = JSON.parse(this.req.body);
          }
          if (this.req.contentType === "binary") {
            config.data = this.req.body;
          }
        }

        if (this.req.recaptcha && this.recaptchaToken) {
          let recaptchaTokenInBody = false;
          if (this.isWithBody) {
            if (this.req.contentType.startsWith("json")) {
              if (config.data instanceof Object) {
                config.data["g-recaptcha-response"] = this.recaptchaToken;
                recaptchaTokenInBody = true;
              }
            }
          }
          if (!this.isWithBody || !recaptchaTokenInBody) {
            config.params["g-recaptcha-response"] = this.recaptchaToken;
          }
        }

        if (this.req.contentType.startsWith("json")) {
          config.data = JSON.stringify(config.data);
        }

        const query = qs.stringify(config.params);
        if (query) {
          this.res.url = `${this.res.url}?${query}`;
        }
        this.res.url = decodeURI(this.res.url);

        return config;
      },
      keyValueToObject(dictionary) {
        const result = {};
        for (const item of dictionary) {
          if (item.enabled) {
            result[item.key] = item.value;
          }
        }
        return result;
      },
      onAceEditorChange(newValue) {
        this.req.body = newValue;
      },
      async onSubmit() {
        this.resetResponse();
        this.res.isSubmit = true;
        try {
          const config = this.generateAxiosConfig();

          const axiosInstance = axios.create();
          axiosInstance.interceptors.request.use((request) => {
            this.setResponseTimeNow();
            return request;
          });
          axiosInstance.interceptors.response.use((response) => {
            this.setResponseTimeDiff();
            return response;
          }, (error) => {
            this.setResponseTimeDiff();
            return Promise.reject(error);
          });
          const res = await axiosInstance(config);

          this.res.status = `${res.status} ${res.statusText}`;
          this.res.body = this.parseResponse(res.data, res.headers["content-type"]);
          this.afterSubmit();
        } catch (error) {
          this.res.status = error.response ? `${error.response.status} ${error.response.statusText}` : error.message;
          this.res.body = error.response && this.parseResponse(error.response.data, error.response.headers["content-type"]) || undefined;
        } finally {
          this.res.isSubmit = false;
          this.recaptchaToken = null;
          if (this.req.recaptcha) {
            this.$refs.recaptcha.reset();
          }
        }
      },
      parseResponse(data, contentType) {
        if (!contentType) {
          return undefined;
        }
        const mimeType = new MimeType(contentType);
        if (mimeType.essence === "application/json") {
          return JSON.parse(new TextDecoder(mimeType.parameters.get("charset") || "utf-8").decode(data));
        }
        if (mimeType.essence === "application/octet-stream") {
          return data;
        }
        return undefined;
      },
      resetResponse() {
        this.res.body = undefined;
        this.res.time = 0;
        this.res.helpers.fileName = undefined;
        this.res.helpers.qrCode = undefined;
      },
      saveResponse() {
        saveAs(new Blob([this.res.body], {type: "application/octet-stream"}), this.res.helpers.fileName);
      },
      setResponseTimeDiff() {
        this.res.time = performance.now() - this.res.time;
      },
      setResponseTimeNow() {
        this.res.time = performance.now();
      },
    },
    watch: {
      preset() {
        if (!this.preset) {
          if (this.req.contentType === "json") {
            this.req.contentType = "json-raw";
          }
        } else {
          const req = Object.assign({
            body: [],
            contentType: "json",
            headers: [],
            params: [],
            query: [],
            recaptcha: false,
          }, JSON.parse(JSON.stringify(presets[this.presetGroup][this.preset])));
          for (const key of ["params", "headers", "query"]) {
            for (const pair of req[key]) {
              pair.id = cuid();
            }
          }
          if (req.contentType === "binary") {
            req.body = null;
          } else {
            for (const item of req.body) {
              if (item.value.type === "undefined") {
                item.value.data = undefined;
              } else if (item.value.type === "date") {
                item.value.data = new Date(item.value.data);
              }
            }
          }
          this.req = req;
        }
      },
      presetGroup() {
        this.preset = this.isCustomPreset ? null : this.presetOptions[0].value;
      },
      "req.body"() {
        if (this.req.body instanceof File && this.preset === "PUT /entities/:id/attachments/:name") {
          for (const item of this.req.params) {
            if (item.key === ":name") {
              item.value = this.fileInputLabel;
              break;
            }
          }
        }
      },
      "req.contentType"(newContentType, oldContentType) {
        if (newContentType === "binary") {
          this.req.body = null;
        }
        if (newContentType === "json-raw" && oldContentType === "binary") {
          this.req.body = "";
        }
        if (newContentType === "json-raw" && oldContentType === "json") {
          this.req.body = this.isWithBody ? `${JSON.stringify(this.bodyAsJson, null, 2)}\n` : "";
        }
      },
      "req.recaptcha"() {
        this.recaptchaToken = null;
      },
      requestTab() {
        this.recaptchaToken = null;
      },
      responseData() {
        if (this.requestTab === "form") {
          ace.edit("ace.response").gotoLine(1, 0);
        }
      },
    },
  }
</script>

<style lang="css" scoped>
  .restored-form-control-border-radius {
    border-radius: 0.25rem !important;
  }
</style>
