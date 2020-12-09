<template>
  <v-app>
    <v-main>
      <AppBar v-if="hide" />
      <NavigationBottom v-if="hide" />
      <router-view></router-view>
      <v-snackbar color="red" :timeout="-1" :value="$store.state.error">
        {{ $store.state.errorMsg }}

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="dismissError">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar color="green" :timeout="-1" :value="$store.state.msg">
        {{ $store.state.msgText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="dismissMsg">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import checkConection from "./services/checkConection";
import AppBar from "./components/AppBar";
import NavigationBottom from "./components/NavigationBottom";

export default {
  name: "App",

  components: {
    AppBar,
    NavigationBottom,
  },

  data: () => ({
    hidePages: ["Login", "PostLeccion"],
  }),

  computed: {
    hide() {
      console.log(this.$route.name);

      console.log(this.hidePages.includes(this.$route.name));
      if (this.hidePages.includes(this.$route.name)) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    ...mapMutations(["dismissError", "dismissMsg"]),
  },

  created() {
    checkConection();
  },
};
</script>
