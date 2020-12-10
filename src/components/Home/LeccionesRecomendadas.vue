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
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-img
          height="250"
          :src="imageUrl + leccionSeleccionada.image"
          class="white--text align-end"
        >
          <v-card-text>
            <v-row dark justify="end">
              <div>
                <span>{{ leccionSeleccionada.rating }}</span>
                <v-icon class="mr-2" dark>mdi-star</v-icon>
              </div>
              <div>
                <span>{{ leccionSeleccionada.graduates }}</span>

                <v-icon class="mr-4" dark>mdi-account</v-icon>
              </div>
            </v-row>
          </v-card-text>
        </v-img>

        <v-card-title>{{ leccionSeleccionada.titulo }}</v-card-title>
        <v-card-subtitle>{{ leccionSeleccionada.username }}</v-card-subtitle>

        <v-card-text>
          {{ leccionSeleccionada.description }}
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn color="primary" small block @click="goLeccion()">
            {{ filter === "recomendadas" ? "tomar leccion" : "editar leccion" }}
          </v-btn>
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
    async goLeccion() {
      if (this.filter === "recomendadas") {
        try {
          await LeccionesService.tomarLeccion(this.leccionSeleccionada.id);
          this.$store.commit("setLeccionViewId", this.leccionSeleccionada.id);
          this.$router.push("/view_leccion/" + this.leccionSeleccionada.id);
        } catch (error) {
          this.$store.commit("raiseError", error.response.data.mensaje);
        }
      } else if (this.filter === "creadas") {
        this.$store.commit("setLeccionEditId", this.leccionSeleccionada.id);
        this.$router.push("/post_leccion");
      }
    },
  },
  async created() {
    try {
      if (this.filter === "creadas") {
        this.data = await LeccionesService.getLeccionesCreadas();
      }
      if (this.filter === "recomendadas") {
        this.data = await LeccionesService.getLeccionesRecomendadas();
      }
    } catch (error) {
      this.$store.commit("raiseError", error.response.data.mensaje);
    }
  },
};
</script>