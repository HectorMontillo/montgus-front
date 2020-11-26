<template>
  <v-sheet class="mx-auto mt-4" max-width="1000">
    <h1 class="text-h6">Lecciones recomendadas</h1>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="6" v-for="card in data" :key="card.id">
        <v-card height="150">
          <v-img
            :src="imageUrl + card.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,0.01), rgba(0,0,0,0.3)"
            height="150"
          >
            <v-card-text>
              <v-row justify="end">
                <div>
                  <span>{{ card.rate }}</span>
                  <v-icon class="mr-2" dark>mdi-star</v-icon>
                </div>
                <div>
                  <span>{{ card.finished }}</span>

                  <v-icon class="mr-4" dark>mdi-account</v-icon>
                </div>
              </v-row>
            </v-card-text>
            <v-card-title
              class="white--text"
              v-text="card.title"
            ></v-card-title>
            <v-card-subtitle
              class="white--text"
              v-text="card.subtitle"
            ></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: "LeccionesRecomendadas",
  data() {
    return {
      imageUrl: process.env.VUE_APP_SERVER + "/images/",

      data: [
        {
          id: "0",
          title: "Finanzas personales",
          subtitle: "Hector Montillo",
          image: "background_image.jpg",
          rate: 4.5,
          finished: "100k",
        },
        {
          id: "1",
          title: "Encuentra el socio correcto",
          subtitle: "Hector Montillo",
          image: "background_image.jpg",
          rate: 4.5,
          finished: "100k",
        },
        {
          id: "2",
          title: "Diseña una landing impactante",
          subtitle: "Hector Montillo",
          image: "background_image.jpg",
          rate: 4.5,
          finished: "100k",
        },
        {
          id: "3",
          title: "Finanzas empresariales",
          subtitle: "Hector Montillo",
          image: "background_image.jpg",
          rate: 4.5,
          finished: "100k",
        },
        {
          id: "4",
          title: "Seguros",
          subtitle: "Hector Montillo",
          image: "background_image.jpg",
          rate: 4.5,
          finished: "100k",
        },
      ],
    };
  },
};
</script>