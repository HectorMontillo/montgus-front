<template>
<v-container class="fill-height" fluid id="bcontainer">

    <v-carousel
        height="500"
        hide-delimiter-background
        show-arrows-on-hover
        class="caro"
        dark
    >
        <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        >
        <v-sheet
            :color= "colors[4]"
            height="100%"
        >   
        <v-row class="mb-4">
            <v-col>
                <v-btn
                value="hear"
                absolute
                right
                small
                @click="listening"
                color = "rgb(235, 227, 227)"
                light
                >
                    <v-icon>mdi-ear-hearing</v-icon>
                </v-btn>
            </v-col>
        </v-row>
            <v-row>
                <v-col>
                    <v-img
                    height="200px"
                    :src="imageUrl + slide.image"
                    contain
                    >
                    </v-img>
                </v-col>
            </v-row>
            
            <v-row class="ml-3 mr-3">
                <v-col>
                    <p class="text-center textslide">{{slide.texto}}</p>
                </v-col>
            </v-row>
        </v-sheet>
        </v-carousel-item>
    </v-carousel>

</v-container>
  
</template>

<style>
#bcontainer {
  background-color: #1E1E1E;
}

.caro {
    border-radius: 10px;
}

.textslide {
    color: rgb(26, 24, 24);
    
}
</style>


<script>
  export default {
    data: () => ({
      model: 0,
      colors: [
          'tile',
          '#ffd000',
          '#b0bec5',
          '#8c9eff',
          'rgb(235, 227, 227)',
          'rgb(172, 171, 162)',
          ],
      imageUrl: process.env.VUE_APP_SERVER + "/images/",
      slides: [{
          id: "0",
          image: 'portada.jpeg',
          audio: '',
          texto: 'Imagina que tienes la idea' + 
                'de abrir una ensambladora de computadores' +
                'porque eres muy bueno en ello'+
                'y como la mayoría de los emprendedores'+
                'quieres encontrar un socio'
      },
      {
          id: "1",
          image: '1img.jpg',
          audio: '',
          texto:    'Las personas que tienes en mente son:'+
                    'Juanpa tu amigo del alma quien también'+
                    'tiene mucho talento para armar pcs,' +
                    'sin embargo, nunca se ha involucrado' +
                    'en la creación de un negocio'
      },
      ],
    }),
    methods: {
        listening(){
            console.log('hear');
        }

    }
  }
</script>

