<template>
  <v-sheet class="mx-auto" max-width="1000">
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
          >
            <v-card-subtitle
              class="white--text"
              v-text="card.title"
            ></v-card-subtitle>
          </v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "ContinuarAprendiendo",
  data() {
    return {
      model: null,
      imageUrl: process.env.VUE_APP_SERVER + "/images/",
      data: [
        {
          id: "0",
          title: "Finanzas personales",
          image: "background_image.jpg",
        },
        {
          id: "1",
          title: "Encuentra el socio correcto",
          image: "background_image.jpg",
        },
        {
          id: "2",
          title: "Diseña una landing impactante",
          image: "background_image.jpg",
        },
        {
          id: "3",
          title: "Finanzas empresariales",
          image: "background_image.jpg",
        },
        {
          id: "4",
          title: "Seguros",
          image: "background_image.jpg",
        },
      ],
    };
  },
};
</script>