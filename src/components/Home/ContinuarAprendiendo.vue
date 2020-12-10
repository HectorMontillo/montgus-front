<template>
  <v-sheet v-if="data.length" class="mx-auto" max-width="1000">
    <h1 class="text-h6">Continuar aprendiendo</h1>
    <v-divider></v-divider>
    <v-slide-group center-active>
      <v-slide-item
        v-for="card in data"
        :key="card.id"
        v-slot="{ active, toggle }"
      >
        <v-card class="ma-4" width="150" height="150" @click="toggle">
          <v-img
            :src="imageUrl + card.image"
            class="white--text align-end"
            :class="active ? 'text--primary' : ''"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150"
            @click="goLeccion(card.id)"
          >
            <v-card-subtitle
              class="white--text"
              v-text="card.titulo"
            ></v-card-subtitle>
          </v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import LeccionesService from "../../services/lecciones";
export default {
  name: "ContinuarAprendiendo",
  data() {
    return {
      model: null,
      imageUrl: process.env.VUE_APP_SERVER + "/uploads/portadas/",
      data: [],
    };
  },
  methods: {
    goLeccion(id) {
      this.$router.push("/view_leccion/" + id);
    },
  },
  async created() {
    try {
      this.data = await LeccionesService.leccionesSinTerminar();
    } catch (error) {
      this.$store.commit("raiseError", error.response.data.mensaje);
    }

    console.log(this.data);
  },
};
</script>