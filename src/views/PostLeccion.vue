<template>
  <v-container class="">
    <v-toolbar rounded flat dark class="mb-10">
      <v-btn icon :disabled="!slides.length" @click="removeSlide()">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>

      <v-btn icon :disabled="!slides.length" @click="editLeccion = true">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon :disabled="!slides.length" @click="onOpenColorPicker(model)">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
      <v-btn
        color="primary "
        @click="addSlide"
        fab
        light
        small
        absolute
        bottom
        right
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        color="white"
        class="mr-12"
        light
        x-small
        absolute
        bottom
        right
        outlined
        text
      >
        {{ model + 1 + " - " + slides.length }}
      </v-btn>
    </v-toolbar>
    <v-carousel v-model="model" v-if="slides.length" height="500">
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet
          :light="slide.light"
          :color="slide.color"
          height="80%"
          shaped
          class="mx-5 px-10"
          @click="editSlide()"
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
      Aún no has agregado ninguna página
    </div>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-btn
          color="primary"
          block
          :disabled="!slides.length"
          @click="publish()"
        >
          Publicar
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" block text to="/home"> Cancelar </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="colorPicker" max-width="300px"
      ><v-color-picker
        value="#7417BE"
        v-model="color"
        hide-canvas
        hide-inputs
        show-swatches
        class="mx-auto"
        @input="onSelectedColor"
      ></v-color-picker>

      <v-btn color="white" outlined class="mt-1" @click="colorPicker = false">
        Close
      </v-btn>
    </v-dialog>

    <v-dialog v-model="edit" persistent max-width="400px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-textarea
            name="input-7-4"
            label="Deja fluir tu creatividad!!"
            v-model="editText"
            :rules="rulesEditText"
            counter
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="edit = false"> Cerrar </v-btn>
          <v-btn color="primary" @click="saveSlide()"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editLeccion" persistent max-width="400px">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>Datos de la lección</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon color="red" @click="eliminarLeccion()">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="leccionEditForm.valid">
            <v-text-field
              v-model="leccionEditForm.name"
              :counter="30"
              :rules="leccionEditForm.nameRules"
              label="Nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="leccionEditForm.description"
              :counter="100"
              :rules="leccionEditForm.descriptionRules"
              label="Descripción"
              required
            ></v-text-field>
            <v-file-input
              @change="onAddFile"
              :rules="leccionEditForm.portadaRules"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon=""
              prepend-inner-icon="mdi-file-upload"
              label="Portada"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="editLeccion = false">
            Cerrar
          </v-btn>
          <v-btn color="primary" @click="saveLeccionData()"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import tinyColor from "tinycolor2";
import LeccionesService from "../services/lecciones";
export default {
  methods: {
    async publish() {
      const id = this.$store.state.leccionEditId;
      try {
        const response = await LeccionesService.setContentLeccion(
          id,
          this.slides
        );
        this.$store.commit("raiseMsg", "Leccion publicada!");
        this.$router.push("./home");
      } catch (error) {
        this.$store.commit("raiseError", error.response.data.mensaje);
      }
    },
    async eliminarLeccion() {
      const id = this.$store.state.leccionEditId;
      try {
        const response = await LeccionesService.eliminarLeccion(id);
        this.$store.commit("raiseMsg", "Leccion eliminada");
        this.$router.push("./home");
      } catch (error) {
        this.$store.commit("raiseError", error.response.data.mensaje);
      }
    },
    onAddFile(file) {
      this.leccionEditForm.portadaFile = file;
    },
    saveSlide() {
      this.edit = false;
      this.slides[this.model].text = this.editText;
      this.editText = "";
      console.log(this.slides[this.model].text, this.editText);
    },
    async saveLeccionData() {
      const id = this.$store.state.leccionEditId;
      try {
        const response = await LeccionesService.updateLeccionData(
          id,
          {
            nombre: this.leccionEditForm.name,
            descripcion: this.leccionEditForm.description,
          },
          this.leccionEditForm.portadaFile
        );
        this.$store.commit(
          "raiseMsg",
          "Lección actualizada satisfactoriamente"
        );
        this.editLeccion = false;
        console.log(response);
      } catch (error) {
        console.log(error);
        this.$store.commit("raiseError", error.response.data.mensaje);
      }
    },
    editSlide() {
      this.edit = true;
      this.editText = this.slides[this.model].text;
    },
    addSlide() {
      let color = tinyColor.random();
      this.slides.push({
        edit: false,
        color: "#" + color.toHex(),
        light: color.isLight(),
        text: "vacío",
        image: "",
        audio: "",
      });
      this.model = this.slides.length - 1;
    },
    removeSlide() {
      this.slides.splice(this.model, 1);
    },
    onSelectedColor(color) {
      this.slides[this.colorIndex].color = color;
      this.slides[this.colorIndex].light = tinyColor(color).isLight();
    },
    onOpenColorPicker(index) {
      this.color = this.slides[index].color;
      this.colorPicker = true;
      this.colorIndex = index;
    },
  },
  data() {
    return {
      model: 0,
      edit: false,
      editLeccion: false,
      colorPicker: false,
      colorIndex: 0,
      color: "",
      editText: "",
      rulesEditText: [(v) => v.length <= 256 || "Máximo 256 carácteres"],
      leccionEditForm: {
        valid: false,
        name: "",
        nameRules: [
          (v) => !!v || "El nombre es requerido",
          (v) =>
            (v && v.length <= 30) ||
            "El nombre debe tener menos de 30 caracteres",
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
      },
      slides: [
        {
          edit: false,
          color: "#263238",
          text: "¿Que quieres compartir hoy?",
          image: "",
          audio: "",
        },
      ],
    };
  },
  async created() {
    try {
      const response = await LeccionesService.getContentLeccion(
        this.$store.state.leccionEditId
      );
      this.leccionEditForm.name = response.titulo;
      this.leccionEditForm.description = response.description;
      if (response.content) {
        this.slides = response.content;
      }
    } catch (error) {
      this.$store.commit("raiseError", error.response.data.mensaje);
    }
  },
};
</script>