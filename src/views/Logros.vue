<template>
  <v-container class="fill-height">
    <v-carousel
      v-model="model"
      v-if="slides.length"
      height="100%"
      @change="onChange()"
    >
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
    <div v-else>
      <v-progress-circular
        class="mx-auto"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <v-dialog v-model="rating" persistent max-width="400px">
      <v-card>
        <v-card-title>Califica esta lección!</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row justify="center">
            <v-rating
              v-model="ratingValue"
              background-color="grey lighten-2"
              color="primary"
              large
            ></v-rating>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" outlined @click="rating = false">
            Volver a la lección
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="finishLesson()"> Terminar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import tinyColor from "tinycolor2";
import LeccionesService from "../services/lecciones";
export default {
  data() {
    return {
      model: 0,
      flag: false,
      rating: false,
      ratingValue: 0,
      slides: [],
    };
  },
  methods: {
    onChange() {
      if (this.model === 0 && this.flag === true) {
        this.rating = true;
      } else if (this.model === this.slides.length - 1) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    async finishLesson() {
      try {
        await LeccionesService.terminarLeccion(
          this.$route.params.leccionId,
          this.ratingValue
        );
        this.$store.commit("raiseMsg", "Felicitaciones! Lección terminada");
        this.$router.push("/home");
      } catch (error) {
        this.$store.commit("raiseError", error.response.data.mensaje);
      }
    },
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