<template lang="pug">
  b-form
    b-form-group(label="Base URL" label-for="baseUrl" description="This URL will be joined with your url path")
      b-input(id="baseUrl" :placeholder="baseUrlPlaceholder" v-model="baseUrl")
    b-form-group(:description="authTokenDescription" label="Auth token" label-for="authToken")
      b-input( id="authToken" v-model="authToken")
    b-form-group(:description="purgatoryTokenDescription" label="Purgatory token" label-for="purgatoryToken")
      b-input(id="purgatoryToken" v-model="purgatoryToken")
</template>

<script lang="js">
  import {
    authToken,
    baseUrl,
    purgatoryToken,
    setAuthToken,
    setBaseUrl,
    setPurgatoryToken,
  } from "../lib/localStorage";

  export default {
    computed: {
      authTokenDescription() {
        return "Can be used as {{authToken}} variable in Headers section";
      },
      baseUrlPlaceholder() {
        return process.env.API_ENDPOINT;
      },
      purgatoryTokenDescription() {
        return "Can be used as {{purgatoryToken}} variable in Headers section";
      },
    },
    data() {
      return {
        authToken: authToken(),
        baseUrl: baseUrl(),
        purgatoryToken: purgatoryToken(),
      };
    },
    head() {
      return {
        title: "Environment",
      };
    },
    layout: "container",
    watch: {
      authToken() {
        setAuthToken(this.authToken);
      },
      baseUrl() {
        setBaseUrl(this.baseUrl);
      },
      purgatoryToken() {
        setPurgatoryToken(this.purgatoryToken);
      },
    },
  }
</script>
