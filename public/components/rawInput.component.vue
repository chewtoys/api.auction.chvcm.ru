<template lang="pug">
  b-form-group(:label="label" :label-for="id")
    date-modal-editor-component(ref="dateModelEditor" :value="value.data" @ok="setValueData($event)")
    interval-modal-editor-component(ref="intervalModelEditor" :value="value.data" @ok="setValueData($event)")
    b-input-group
      b-dropdown(size="sm" variant="outline-secondary" slot="prepend")
        template(slot="button-content")
          font-awesome-icon(:icon="getIconForType(value.type)")
        template(v-for="item in typeOptions")
          b-dropdown-item(:key="item.value" @click.prevent="setValueType(item.value)" v-if="item.text !== '---'")
            font-awesome-icon(:icon="getIconForType(item.value)")
            =" "
            | {{ item.text }}
          b-dropdown-divider(:key="item.value" v-if="item.text === '---'")
      input(type="text" :id="id" :value="valueDataAsString" :placeholder="isNullableType ? tempValueData: ''" :readonly="isNullableType" @change="setValueData($event.target.value)" v-if="!isBigPicture").form-control.form-control-sm
      textarea(rows="2" :id="id" :value="valueDataAsString" @change="setValueData($event.target.value)" v-if="isBigPicture").form-control.form-control-sm
      b-btn(size="sm" variant="outline-secondary" @click="bigPicture = !bigPicture" v-if="value.type === 'text'" slot="append")
        font-awesome-icon(:icon="bigPictureIcon")
      b-btn(size="sm" variant="outline-secondary" @click="setValueData(String(!value.data))" v-if="value.type === 'boolean'" slot="append")
        font-awesome-icon(:icon="booleanToggleIcon")
      b-btn(size="sm" variant="outline-secondary" @click="$refs.dateModelEditor.show()" v-if="value.type === 'date'" slot="append")
        font-awesome-icon(:icon="searchIcon")
      b-btn(size="sm" variant="outline-secondary" @click="$refs.intervalModelEditor.show()" v-if="value.type === 'interval'" slot="append")
        font-awesome-icon(:icon="searchIcon")
</template>

<script lang="js">
  import {
    faBold,
    faCalendarAlt,
    faClock,
    faCompress,
    faExpand,
    faFont,
    faListOl,
    faSearch,
    faSkullCrossbones,
    faTimes,
    faToggleOff,
    faToggleOn,
  } from "@fortawesome/free-solid-svg-icons";

  import * as cuid from "cuid";
  import * as postgresInterval from "postgres-interval";

  import DateModalEditorComponent from "~/components/dateModalEditor.component.vue";
  import IntervalModalEditorComponent from "~/components/intervalModalEditor.component.vue";

  import postgresIntervalToString from "../lib/postgresIntervalToString.js";

  export default {
    components: {
      DateModalEditorComponent,
      IntervalModalEditorComponent,
    },
    computed: {
      bigPictureIcon() {
        return this.bigPicture ? faCompress : faExpand;
      },
      booleanToggleIcon() {
        return this.value.data ? faToggleOn : faToggleOff;
      },
      isBigPicture() {
        return this.bigPicture && this.value.type === "text";
      },
      isNullableType() {
        return ["undefined", "null"].some((x) => x === this.value.type);
      },
      searchIcon() {
        return faSearch;
      },
      typeOptions() {
        return [
          {text: "Text", value: "text"},
          {text: "Number", value: "number"},
          {text: "Boolean", value: "boolean"},
          {text: "---", value: "separator1"},
          {text: "Date", value: "date"},
          {text: "Interval", value: "interval"},
          {text: "---", value: "separator2"},
          {text: "Null", value: "null"},
          {text: "Undefined", value: "undefined"},
        ];
      },
      valueDataAsString() {
        if (this.isNullableType) {
          return "";
        }
        if (this.value.type === "date") {
          return isNaN(this.value.data.getTime()) ? "" : this.value.data.toISOString();
        }
        if (this.value.type === "interval") {
          return postgresIntervalToString(this.value.data);
        }
        return String(this.value.data);
      },
    },
    created() {
      this.tempValueData = this.valueDataAsString;
    },
    data() {
      return {
        bigPicture: false,
        id: cuid(),
        tempValueData: undefined,
      };
    },
    methods: {
      getIconForType(type) {
        if (type === "text") {
          return faFont;
        }
        if (type === "number") {
          return faListOl;
        }
        if (type === "boolean") {
          return faBold;
        }
        if (type === "date") {
          return faCalendarAlt;
        }
        if (type === "interval") {
          return faClock;
        }
        if (type === "null") {
          return faTimes;
        }
        if (type === "undefined") {
          return faSkullCrossbones;
        }
      },
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
        if (newType === "date") {
          this.$emit("input", {data: new Date(newData), type: newType});
        }
        if (newType === "interval") {
          this.$emit("input", {data: Object.assign({}, postgresInterval(newData)), type: newType});
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
    props: {
      label: {
        required: true,
        type: String,
      },
      value: {
        required: true,
        type: Object,
      },
    },
    watch: {
      value() {
        if (!this.isNullableType) {
          this.tempValueData = this.valueDataAsString;
        }
      },
    },
  }
</script>

<style scoped lang="css">
  textarea {
    min-height: calc(1.8125rem + 2px);
  }
</style>
