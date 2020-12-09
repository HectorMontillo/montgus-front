<template>
  <v-container>
    <ContinuarAprendiendo />
    <LeccionesRecomendadas title="Lecciones recomendadas"/>
  </v-container>
</template>

<script>
import ContinuarAprendiendo from "../components/Home/ContinuarAprendiendo";
import LeccionesRecomendadas from "../components/Home/LeccionesRecomendadas";
export default {
  components: {
    ContinuarAprendiendo,
    LeccionesRecomendadas,
  },
};
</script>