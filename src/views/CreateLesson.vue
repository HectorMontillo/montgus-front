<template>
    <v-container>
        
        <h1 class="text-h6 mt-3">Crear tu lección</h1>
        
        <v-row>
            <v-col cols=10 class="mt-2">
              <v-card color="blue-grey darken-2">
                <v-card-text class="white--text">
                    <div>
                        <span>Las lecciones más exitosas son aquellas que son cortas e interactivas</span>
                    </div>
                </v-card-text>
              </v-card>  
            </v-col>
        </v-row>

        <v-row>
            <v-col cols=10 offset="2" class="mt-0">
              <v-card color="blue-grey darken-2">
                <v-card-text class="white--text">
                    <div>
                        <span>Por cada página tendras 256 caracteres. Usa al máximo tu creatividad!!</span>
                    </div>
                </v-card-text>
              </v-card>  
            </v-col>
        </v-row>
        
        <v-row>
            <v-col>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
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

                    
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols=12>
                <h5 class="mb-2">Cargar portada</h5>
                <v-btn>
                    <v-icon>mdi-upload</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row align="center" justify="center" class="mt-4">
            <v-btn
                color="#ffd000"
                @click="reset"
                >
                Crear Lección
                </v-btn>
        </v-row>

        
    </v-container>
</template>


<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 30) || 'El nombre debe tener menos de 30 caracteres'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'La descripción es requerida',
        v => (v && v.length <= 100) || 'La descripción debe tener menos de 100 caracteres'
      
      ],
      value: 'recent',
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        //de momento se puso a que resete el form
        //this.$refs.form.reset()
        this.$router.push('/home')
      }
    }
  }
</script>