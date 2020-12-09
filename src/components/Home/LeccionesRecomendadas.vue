<template>
  <v-sheet class="mx-auto mt-4" max-width="1000">
    <h1 class="text-h6">{{ title }}</h1>
    <v-divider></v-divider>
    <v-row v-if="data.length">
      <v-col cols="12" md="6" v-for="card in data" :key="card.id">
        <v-card height="150" @click="verLeccion(card)">
          <v-img
            :src="imageUrl + card.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,0.01), rgba(0,0,0,0.3)"
            height="150"
          >
            <v-card-text>
              <v-row justify="end">
                <div>
                  <span>{{ card.rating }}</span>
                  <v-icon class="mr-2" dark>mdi-star</v-icon>
                </div>
                <div>
                  <span>{{ card.graduates }}</span>

                  <v-icon class="mr-4" dark>mdi-account</v-icon>
                </div>
              </v-row>
            </v-card-text>
            <v-card-title
              class="white--text"
              v-text="card.titulo"
            ></v-card-title>
            <v-card-subtitle
              class="white--text"
              v-text="card.username"
            ></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <div v-else class="display-5 mt-10 text-center">No hay lecciones</div>

    <!-- 

    <v-row>
      <v-col>
        <v-btn block outlined color="primary" @click="verMas()">Ver más!</v-btn>
      </v-col>
    </v-row>
    -->
    <v-dialog v-model="dialog">
      <v-card class="mx-auto my-12">
        <v-img height="250" :src="imageUrl + leccionSeleccionada.image"></v-img>

        <v-card-title>{{ leccionSeleccionada.titulo }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="leccionSeleccionada.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">4.5 (413)</div>
          </v-row>

          <div class="my-4 subtitle-1">$ • Italian, Cafe</div>

          <div>
            Small plates, salads & sandwiches - an intimate setting with 12
            indoor seats plus patio seating.
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import LeccionesService from "../../services/lecciones";

export default {
  name: "LeccionesRecomendadas",
  props: {
    title: {
      type: String,
      default: "Lecciones",
    },
    filter: {
      type: String,
      default: "recomendadas",
    },
  },
  data() {
    return {
      dialog: false,
      imageUrl: process.env.VUE_APP_SERVER + "/uploads/portadas/",
      leccionSeleccionada: {
        id: "",
        titulo: "",
        username: "",
        description: "",
        image: "",
        rating: "",
        graduated: "",
      },
      data: [],
    };
  },
  methods: {
    verMas() {},
    verLeccion(leccion) {
      this.dialog = true;
      this.leccionSeleccionada = leccion;
    },
  },
  async created() {
    try {
      if (this.filter === "creadas") {
        this.data = await LeccionesService.getLeccionesCreadas();
      }
    } catch (error) {
      this.$store.commit("raiseError", error.response.data.mensaje);
    }
  },
};
</script>