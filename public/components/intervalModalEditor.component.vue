<template lang="pug">
  b-modal(ref="modal" title="Interval editor" @ok="onOk()" @shown="onShown()")
    b-form
      b-form-row
        b-col(sm="4")
          b-form-group(label="Years" :label-for="`${id}.years`")
            b-input(type="number" size="sm" min="0" step="1" :id="`${id}.years`" v-model="localValue.years")
        b-col(sm="4")
          b-form-group(label="Months" :label-for="`${id}.months`")
            b-input(type="number" size="sm" min="0" step="1" :id="`${id}.months`" v-model="localValue.months")
        b-col(sm="4")
          b-form-group(label="Days" :label-for="`${id}.days`")
            b-input(type="number" size="sm" min="0" step="1" :id="`${id}.days`" v-model="localValue.days")
      b-form-row
        b-col(sm="6")
          b-form-group(label="Hours" :label-for="`${id}.hours`")
            b-input(type="number" size="sm" min="0" step="1" :id="`${id}.hours`" v-model="localValue.hours")
        b-col(sm="6")
          b-form-group(label="Minutes" :label-for="`${id}.minutes`")
            b-input(type="number" size="sm" min="0" step="1" :id="`${id}.minutes`" v-model="localValue.minutes")
      b-form-row
        b-col(sm="6")
          b-form-group(label="Seconds" :label-for="`${id}.seconds`")
            b-input(type="number" size="sm" min="0" step="1" :id="`${id}.seconds`" v-model="localValue.seconds")
        b-col(sm="6")
          b-form-group(label="Milliseconds" :label-for="`${id}.milliseconds`")
            b-input(type="number" size="sm" min="0" max="999" step="1" :id="`${id}.milliseconds`" v-model="localValue.milliseconds")
</template>

<script lang="js">
  import * as cuid from "cuid";

  import postgresIntervalToString from "../lib/postgresIntervalToString.js";

  export default {
    data() {
      return {
        id: cuid(),
        localValue: {},
      };
    },
    methods: {
      onOk() {
        this.$emit("ok", postgresIntervalToString(this.localValue));
      },
      onShown() {
        this.localValue = {
          years: this.value.years || 0,
          months: this.value.months || 0,
          days: this.value.days || 0,
          hours: this.value.hours || 0,
          minutes: this.value.minutes || 0,
          seconds: this.value.seconds || 0,
          milliseconds: this.value.milliseconds || 0,
        };
      },
      show() {
        this.$refs.modal.show();
      },
    },
    props: {
      value: {
        required: true,
      },
    },
  }
</script>
