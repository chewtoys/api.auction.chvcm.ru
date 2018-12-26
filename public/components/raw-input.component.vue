<template lang="pug">
  div.form-group
    label(v-bind:for="inputId" v-if="label") {{ label }}
    div.input-group
      div.input-group-prepend
        button(type="button" data-toggle="dropdown").btn.btn-outline-secondary.dropdown-toggle
          i(v-if="value.type === 'text'").fas.fa-font
          i(v-if="value.type === 'number'").fas.fa-list-ol
          i(v-if="value.type === 'boolean'").fas.fa-bold
          i(v-if="value.type === 'datetime-local'").fas.fa-calendar-alt
          i(v-if="value.type === 'postgres-interval'").fas.fa-clock
          i(v-if="value.type === 'null'").fas.fa-times
          i(v-if="value.type === 'undefined'").fas.fa-skull-crossbones
        div.dropdown-menu
          a(href="#" v-on:click.prevent="setValueType('text')").dropdown-item
            i.fas.fa-font
            =" "
            | Text
          a(href="#" v-on:click.prevent="setValueType('number')").dropdown-item
            i.fas.fa-list-ol
            =" "
            | Number
          a(href="#" v-on:click.prevent="setValueType('boolean')").dropdown-item
            i.fas.fa-bold
            =" "
            | Boolean
          div(role="separator").dropdown-divider
          a(href="#" v-on:click.prevent="setValueType('datetime-local')").dropdown-item
            i.fas.fa-calendar-alt
            =" "
            | Date
          a(href="#" v-on:click.prevent="setValueType('postgres-interval')").dropdown-item
            i.fas.fa-clock
            =" "
            | Interval
          div(role="separator").dropdown-divider
          a(href="#" v-on:click.prevent="setValueType('null')").dropdown-item
            i.fas.fa-times
            =" "
            | Null
          a(href="#" v-on:click.prevent="setValueType('undefined')").dropdown-item
            i.fas.fa-skull-crossbones
            =" "
            | Undefined
      input(step="any" v-bind:id="inputId" v-bind:type="inputType" v-bind:value="valueDataAsString" v-bind:readonly="isNullableType" v-bind:placeholder="isNullableType ? tempValueData: ''" v-on:change="setValueData($event.target.value)" v-if="!showBigPicture").form-control
      textarea(rows="2" v-bind:id="inputId" v-bind:value="valueDataAsString" v-on:change="setValueData($event.target.value)" v-if="showBigPicture").form-control
      div.input-group-append
        button(type="button" v-on:click="bigPicture = !bigPicture" v-if="value.type === 'text'").btn.btn-outline-secondary
          i(v-if="!bigPicture").fas.fa-expand
          i(v-if="bigPicture").fas.fa-compress
        button(type="button" v-on:click="setValueData(String(!value.data))" v-if="value.type === 'boolean'").btn.btn-outline-secondary
          i(v-if="!value.data").fas.fa-toggle-off
          i(v-if="value.data").fas.fa-toggle-on
</template>

<script lang="js">
  import * as cuid from "cuid";
  import * as moment from "moment";
  import * as postgresInterval from "postgres-interval";

  const datetimeLocalFormat = "YYYY-MM-DDTHH:mm";

  export default {
    computed: {
      inputType() {
        return this.isNullableType || ["boolean", "postgres-interval"].some((x) => x === this.value.type) ?
          'text' : this.value.type;
      },
      isNullableType() {
        return ["undefined", "null"].some((x) => x === this.value.type);
      },
      showBigPicture() {
        return this.bigPicture && this.value.type === "text";
      },
      valueDataAsString() {
        if (this.isNullableType) {
          return "";
        }
        if (this.value.type === "datetime-local") {
          return moment(this.value.data).format(datetimeLocalFormat);
        }
        if (this.value.type === "postgres-interval") {
          return [
            this.value.data.years ? `${this.value.data.years} years` : null,
            this.value.data.months ? `${this.value.data.months} mons` : null,
            this.value.data.days ? `${this.value.data.days} days` : null,
            [
              ["hours", "minutes", "seconds"].map((x) => String(this.value.data[x] || "0").padStart(2, "0")).join(":"),
              this.value.data.milliseconds ? String(this.value.data.milliseconds).padStart(3, "0") : null,
            ].filter((x) => !!x).join(".")
          ].filter((x) => !!x).join(" ");
        }
        return String(this.value.data);
      },
    },
    data() {
      return {
        bigPicture: false,
        inputId: cuid(),
        tempValueData: this.valueDataAsString,
      };
    },
    methods: {
      setValueData(newData, newType) {
        newType = newType || this.value.type;
        if (newType === "text") {
          this.$emit("input", {data: newData, type: newType});
        }
        if (newType === "number") {
          this.$emit("input", {data: parseFloat(newData), type: newType});
        }
        if (newType === "boolean") {
          this.$emit("input", {
            data: ["yes", "y", "t", "1", "true"].some((x) => x === newData.toLowerCase()),
            type: newType,
          });
        }
        if (newType === "datetime-local") {
          this.$emit("input", {data: moment(newData, datetimeLocalFormat).toDate(), type: newType});
        }
        if (newType === "postgres-interval") {
          this.$emit("input", {data: JSON.parse(JSON.stringify(postgresInterval(newData))), type: newType});
        }
      },
      setValueType(newType) {
        if (newType === "undefined") {
          this.$emit("input", {data: undefined, type: newType});
        } else if (newType === "null") {
          this.$emit("input", {data: null, type: newType});
        } else {
          this.setValueData(this.tempValueData, newType);
        }
      },
    },
    props: ["value", "label"],
    watch: {
      value() {
        if (!this.isNullableType) {
          this.tempValueData = this.valueDataAsString;
        }
      },
    },
  };
</script>

<style scoped lang="css">
  textarea {
    min-height: 38px;
  }
</style>
