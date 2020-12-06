<template>
<v-container class="fill-height" fluid id="bcontainer">
  
  <v-carousel v-model="model" next-icon prev-icon>
    <v-carousel-item
      v-for="(txt, i) in texts"
      :key="i"
    >
      <v-sheet
        height="100%"
        tile
      >
      <v-row>
        <v-col>
          <v-btn
          value="delete"
          absolute
          right
          small
          @click="deleteSlide(i)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
        
      </v-row>
      
        <v-row
          align="center"
          justify="center"
        >
            <v-col class="ml-4 mr-4 mt-4">
                <!--TODO investigar como hacer push al array texts-->
                <v-textarea
                solo
                height="250"
                name="input-7-4"
                v-model="areadetxt"
                label="Escribe aquí"
                :counter= "256"
                maxlength="256"
                hint="La mejor lección se está construyendo aquí"
                >
                </v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="ml-4 mr-4">
                <span style="color: white"> {{ txt.texto }} </span>
                
            </v-col>
        </v-row>
          
      </v-sheet>
      
    </v-carousel-item>
  </v-carousel>

  <v-row >
    <v-col class="mb-4">
      <v-bottom-navigation v-model="value">

    <v-btn value="record">
      <span>Grabar</span>

      <v-icon>mdi-microphone</v-icon>
    </v-btn>
    
    <v-btn value="image">
      <span>Imagen</span>

      <v-icon>mdi-image-plus</v-icon>
    </v-btn>

    <v-btn
    value="add"
    @click="newslide">
      <span>Añadir</span>

      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-bottom-navigation>
    </v-col>
          
  </v-row>
  <v-row align="center" justify="center" class="mt-4">
    <v-btn
        color="#ffd000"
        @click="create"
        >
        Publicar
    </v-btn>
            
  </v-row>
</v-container>
  
</template>

<style>
#bcontainer {
  background-color: #1E1E1E;
}
</style>


<script>
  export default {
    data: () => ({
      model: 0,
      areadetxt: '',
      value: 'recent',

      texts: [{
          id: "0",
          texto: ''
      },
      ],
    }),
    methods: {
      create () {
        this.$router.push('/create')
      },
      newslide(){
        //TODO para modificar el slide, se puede añadir un boton
          if (this.texts.length == 1){
             this.texts.unshift({id: this.texts.length,texto: this.areadetxt})
          }
          else{
            this.texts[this.texts.length -1] = {id: this.texts.length,texto: this.areadetxt}
            this.texts.push({id:"78",texto: ""})
          }
          this.areadetxt = ''
        },
      deleteSlide(index){
        this.texts.splice(index,1);
        console.log(index)
      }

    }
  }
</script>

