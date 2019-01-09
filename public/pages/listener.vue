<template lang="pug">
  b-row
    b-col(md="2")
      b-nav(vertical pills fill)
        b-btn(variant="outline-danger" :disabed="!events.length" @click="clearEvents()").mb-3
          font-awesome-icon(:icon="trashAltIcon")
          =" "
          | Clear
        b-nav-item(v-for="item in events" :key="item.id" :active="selectedEvent && item.id === selectedEvent.id" @click="selectedEvent = item") {{ item.event }}
    b-col(md="10")
      b-form
        b-btn(type="button" variant="primary" @click="connect()").mb-3 Connect
        b-btn(type="button" variant="secondary" @click="disconnect()").mb-3.ml-2 Disconnect
        b-form-group
          b-form-checkbox(v-model="hidePingPong") Hide Ping/Pong
        ace-editor(name="ace.response" mode="javascript" theme="monokai" width="100%" height="100px" :readOnly="true" :fontSize="14" :minLines="10" :maxLines="Infinity" :editorProps="{$blockScrolling: Infinity}" :value="eventData").mb-3
</template>

<script lang="js">
  import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

  import * as cuid from "cuid";
  import io from "socket.io-client";
  import {Ace as AceEditor} from "vue2-brace-editor";

  import "brace/mode/javascript";
  import "brace/theme/monokai";

  import {authToken, baseUrl} from "../lib/localStorage";

  export default {
    beforeDestroy() {
      if (this.socket) {
        this.disconnect();
      }
    },
    components: {
      AceEditor,
    },
    computed: {
      eventData() {
        return this.selectedEvent ? [
          `// Date: ${this.selectedEvent.date.toString()}`,
          this.selectedEvent.payload === undefined ? null : `\n\n${JSON.stringify(this.selectedEvent.payload, null, 2)}`,
          "\n",
        ].filter((v) => !!v).join("") : `// Press "Connect" and select event to view payload\n`;
      },
      trashAltIcon() {
        return faTrashAlt;
      },
    },
    created() {
      this.socket.on("connect", () => {
        this.events.unshift({date: new Date(), event: "connect", id: cuid(), payload: undefined});
      });

      this.socket.on("connect_error", (error) => {
        this.events.unshift({date: new Date(), event: "connect_error", id: cuid(), payload: error});
      });

      this.socket.on("connect_timeout", (timeout) => {
        this.events.unshift({date: new Date(), event: "connect_timeout", id: cuid(), payload: {timeout}});
      });

      this.socket.on("error", (error) => {
        this.events.unshift({
          date: new Date(),
          event: "error",
          id: cuid(),
          payload: typeof error === "object" ? error : {error},
        });
      });

      this.socket.on("disconnect", (reason) => {
        this.events.unshift({date: new Date(), event: "disconnect", id: cuid(), payload: {reason}});
      });

      this.socket.on("reconnect", (attemptNumber) => {
        this.events.unshift({date: new Date(), event: "reconnect", id: cuid(), payload: {attemptNumber}});
      });

      this.socket.on("reconnect_attempt", (attemptNumber) => {
        this.events.unshift({date: new Date(), event: "reconnect_attempt", id: cuid(), payload: {attemptNumber}});
      });

      this.socket.on("reconnecting", (attemptNumber) => {
        this.events.unshift({date: new Date(), event: "reconnecting", id: cuid(), payload: {attemptNumber}});
      });

      this.socket.on("reconnect_error", (error) => {
        this.events.unshift({date: new Date(), event: "reconnect_error", id: cuid(), payload: error});
      });

      this.socket.on("reconnect_failed", () => {
        this.events.unshift({date: new Date(), event: "reconnect_failed", id: cuid(), payload: undefined});
      });

      this.socket.on("ping", () => {
        if (!this.hidePingPong) {
          this.events.unshift({date: new Date(), event: "ping", id: cuid(), payload: undefined});
        }
      });

      this.socket.on("pong", (latency) => {
        if (!this.hidePingPong) {
          this.events.unshift({date: new Date(), event: "pong", id: cuid(), payload: {latency}});
        }
      });

      this.socket.on("lot", (lot) => {
        this.events.unshift({date: new Date(), event: "lot", id: cuid(), payload: lot});
      });
    },
    data() {
      return {
        events: [],
        hidePingPong: true,
        selectedEvent: null,
        socket: io.connect(baseUrl() || process.env.API_ENDPOINT, {
          autoConnect: false,
          query: {
            token: authToken(),
          },
          transports: process.env.SOCKET_TRANSPORTS,
        }),
      };
    },
    head() {
      return {
        title: "Listener",
      };
    },
    layout: "container",
    methods: {
      clearEvents() {
        this.selectedEvent = null;
        this.events = [];
      },
      connect() {
        this.socket.connect();
      },
      disconnect() {
        this.socket.disconnect();
      },
    },
  }
</script>
