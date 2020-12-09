<template>
  <v-container class="fill-height" >
    
      <v-carousel v-model="model" height="100%">
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
      elevation="2"
        :color="color"
        height="80%"
        shaped
        continuous="false"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
    
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }
  }
}
</script>