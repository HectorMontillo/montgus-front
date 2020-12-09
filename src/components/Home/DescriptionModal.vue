<template>
  <v-dialog v-model="dialog" width="300">
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <v-img height="250" :src="imageUrl + card.image"></v-img>

      <v-card-title>{{ titulo }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="rating"
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
          Small plates, salads & sandwiches - an intimate setting with 12 indoor
          seats plus patio seating.
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text> Reserve </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DescriptionModal",
  props: {
    dialog: false,
    id: "",
    titulo: "",
    username: "",
    description: "",
    image: "",
    rating: "",
    graduated: "",
  },
  data: () => ({
    imageUrl: process.env.VUE_APP_SERVER + "/uploads/portadas/",
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>