<template>
  <v-bottom-navigation value="1" color="primary" grow dark app>
    <v-btn to="/home">
      <span>Inicio</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/creaciones">
      <span>Creaciones</span>

      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn>
      <span>Logros</span>

      <v-icon>mdi-school</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "NavigationBottom",
};
</script>