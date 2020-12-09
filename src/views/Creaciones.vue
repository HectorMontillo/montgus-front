<template>
  <v-container>
    <LeccionesRecomendadas title="Mis lecciones"/>
    <v-btn
        
        color="primary"
        fab
        dark
        bottom
        right
        fixed
        class="mb-14"
        to="/crear_leccion"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
  </v-container>
</template>

<script>
import LeccionesRecomendadas from "../components/Home/LeccionesRecomendadas";
export default {
  components: {
    LeccionesRecomendadas,
  },
};
</script>