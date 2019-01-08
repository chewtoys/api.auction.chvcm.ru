<template lang="pug">
  b-modal(ref="modal" title="Date editor" @ok="onOk()" @shown="onShown()")
    b-form
      b-form-row
        b-col(sm="4")
          b-form-group(label="Year" :label-for="`${id}.year`")
            b-input(type="number" size="sm" min="1000" max="9999" step="1" :id="`${id}.year`" v-model="localValue.year")
        b-col(sm="4")
          b-form-group(label="Month" :label-for="`${id}.month`")
            b-form-select(size="sm" :options="monthOptions" :id="`${id}.month`" v-model="localValue.month")
        b-col(sm="4")
          b-form-group(label="Day" :label-for="`${id}.date`")
            b-input(type="number" size="sm" min="1" :max="maxDaysInMonth" step="1" :id="`${id}.date`" v-model="localValue.date")
      b-form-row
        b-col(sm="6")
          b-form-group(label="Hours" :label-for="`${id}.hours`")
            b-input(type="number" size="sm" min="0" max="23" step="1" :id="`${id}.hours`" v-model="localValue.hours")
        b-col(sm="6")
          b-form-group(label="Minutes" :label-for="`${id}.minutes`")
            b-input(type="number" size="sm" min="0" max="59" step="1" :id="`${id}.minutes`" v-model="localValue.minutes")
      b-form-row
        b-col(sm="6")
          b-form-group(label="Seconds" :label-for="`${id}.seconds`")
            b-input(type="number" size="sm" min="0" max="59" step="1" :id="`${id}.seconds`" v-model="localValue.seconds")
        b-col(sm="6")
          b-form-group(label="Milliseconds" :label-for="`${id}.milliseconds`")
            b-input(type="number" size="sm" min="0" max="999" step="1" :id="`${id}.milliseconds`" v-model="localValue.milliseconds")
      small.form-text.text-muted {{ localValueAsDate.toString() }}
</template>

<script lang="js">
  import * as cuid from "cuid";

  export default {
    computed: {
      localValueAsDate() {
        return new Date(this.localValue.year, this.localValue.month, this.localValue.date,
          this.localValue.hours, this.localValue.minutes,
          this.localValue.seconds, this.localValue.milliseconds);
      },
      maxDaysInMonth() {
        return new Date(this.localValue.year, parseInt(this.localValue.month, 10) + 1, 0).getDate();
      },
      monthOptions() {
        return [
          {text: "January", value: "0"},
          {text: "February", value: "1"},
          {text: "March", value: "2"},
          {text: "April", value: "3"},
          {text: "May", value: "4"},
          {text: "June", value: "5"},
          {text: "July", value: "6"},
          {text: "August", value: "7"},
          {text: "September", value: "8"},
          {text: "October", value: "9"},
          {text: "November", value: "10"},
          {text: "December", value: "11"},
        ];
      },
    },
    data() {
      return {
        id: cuid(),
        localValue: {},
      };
    },
    methods: {
      onOk() {
        this.$emit("ok", this.localValueAsDate.toISOString());
      },
      onShown() {
        const validDate = isNaN(this.value.getTime()) ? (() => {
          const now = new Date();
          now.setSeconds(0, 0);
          return now;
        })() : this.value;
        this.localValue = {
          year: validDate.getFullYear(),
          month: validDate.getMonth(),
          date: validDate.getDate(),
          hours: validDate.getHours(),
          minutes: validDate.getMinutes(),
          seconds: validDate.getSeconds(),
          milliseconds: validDate.getMilliseconds(),
        };
      },
      resetDate() {
        if (this.localValue.date > this.maxDaysInMonth) {
          this.localValue.date = this.maxDaysInMonth;
        }
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
    watch: {
      "localValue.year"() {
        this.resetDate();
      },
      "localValue.month"() {
        this.resetDate();
      },
    },
  }
</script>
