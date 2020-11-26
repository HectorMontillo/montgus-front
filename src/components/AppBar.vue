<template>
  <!-- 

  <v-app-bar
    color="#fcb69f"
    dark
    src="http://localhost:3000/images/landing_image.jpg"
    app
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.8)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>
      <img
        height="40"
        src="http://localhost:3000/images/logo_es.png"
        class="mt-10"
      />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
-->

  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <!-- 
      <v-toolbar-title>
        <img height="40" :src="imageUrl + 'logo_es_gray.png'" />
      </v-toolbar-title>
      -->
      <v-spacer></v-spacer>
      <div style="max-width: 512px">
        <v-text-field
          solo
          dense
          light
          rounded
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list nav dense>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({
    imageUrl: process.env.VUE_APP_SERVER + "/images/",
    drawer: false,
    group: null,
  }),
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
  },
};
</script>