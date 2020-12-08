<template>
  <v-container>
    <ContinuarAprendiendo />
    <LeccionesRecomendadas />
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