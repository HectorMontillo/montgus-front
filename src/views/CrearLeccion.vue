<template>
  <v-container>
    <v-sheet class="mx-auto mt-4" max-width="1000">
      <h1 class="text-h6">Crear tu lección</h1>

      <v-row>
        <v-col cols="10" md="6">
          <v-alert
            color="#1E1E1E"
            dark
            icon="mdi-firework"
            dense
            dismissible
            elevation="2"
            border="top"
          >
            Las lecciones más exitosas son aquellas que son cortas e
            interactivas
          </v-alert>
        </v-col>
        <v-col cols="10" md="6" offset="2" offset-md="0">
          <v-alert
            color="#1E1E1E"
            dark
            icon="mdi-creation"
            dense
            dismissible
            border="top"
            elevation="2"
          >
            Por cada página tendras 256 caracteres. Usa al máximo tu
            creatividad!!
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="name"
              :counter="30"
              :rules="nameRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="description"
              :counter="100"
              :rules="descriptionRules"
              label="Descripción"
              required
            ></v-text-field>
            <v-file-input
              @change="onAddFile"
              :rules="portadaRules"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon=""
              prepend-inner-icon="mdi-file-upload"
              label="Portada"
            ></v-file-input>
          </v-form>
        </v-col>
      </v-row>

      <v-row align="center" justify="center" class="mt-4">
        <v-btn color="#ffd000" @click="create" :disabled="!valid">
          Crear Lección
        </v-btn>
      </v-row>
    </v-sheet>
  </v-container>
</template>


<script>
import LeccionesService from "../services/lecciones";

export default {
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      (v) => !!v || "El nombre es requerido",
      (v) =>
        (v && v.length <= 30) || "El nombre debe tener menos de 30 caracteres",
    ],
    description: "",
    descriptionRules: [
      (v) => !!v || "La descripción es requerida",
      (v) =>
        (v && v.length <= 100) ||
        "La descripción debe tener menos de 100 caracteres",
    ],
    portadaFile: undefined,
    portadaRules: [
      (v) => !!v || "La portada es requerida",
      (v) =>
        !v ||
        v.size < 10000000 ||
        "El tamaño de la portada debe ser menor a 10 MB!",
    ],
    value: "recent",
  }),
  methods: {
    /*
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },*/
    onAddFile(file) {
      this.portadaFile = file;
    },
    async create() {
      try {
        const response = await LeccionesService.createLeccion({
          nombre: this.name,
          descripcion: this.description,
          file: this.portadaFile,
        });
        this.$store.commit("raiseMsg", "Lección creada satisfactoriamente");
        console.log(response);
        this.$store.commit("setLeccionEditId", response.id);
        this.$router.push("/post_leccion");
      } catch (error) {
        console.log(error);
        this.$store.commit("raiseError", error.response.data.mensaje);
      }
    },
  },
};
</script>