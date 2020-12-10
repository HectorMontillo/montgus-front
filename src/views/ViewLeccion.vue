<template>
  <v-container class="fill-height">
    <v-carousel v-model="model" v-if="slides.length" height="100%">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet
          :light="slide.light"
          :color="slide.color"
          height="80%"
          shaped
          class="mx-5 px-10"
        >
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-5 text-center">
              {{ slide.text }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div v-else class="display-5 text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      Cargando
    </div>
  </v-container>
</template>

<script>
import tinyColor from "tinycolor2";
import LeccionesService from "../services/lecciones";
export default {
  data() {
    return {
      model: 0,

      slides: [],
    };
  },
  async created() {
    console.log(this.$route.params.leccionId);
    try {
      const response = await LeccionesService.getContentLeccion(
        this.$route.params.leccionId
      );

      this.slides = response.content;
    } catch (error) {
      this.$store.commit("raiseError", error.response.data.mensaje);
    }
  },
};
</script>