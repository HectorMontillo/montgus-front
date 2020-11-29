<template>
  <v-container>
    <ContinuarAprendiendo />
    <LeccionesRecomendadas />
  </v-container>
</template>

<script>
import ContinuarAprendiendo from "../components/ContinuarAprendiendo";
import LeccionesRecomendadas from "../components/LeccionesRecomendadas";
export default {
  components: {
    ContinuarAprendiendo,
    LeccionesRecomendadas,
  },
};
</script>