<template>
  
    <v-container>
      <v-row>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-row>

      <v-navigation-drawer app
        v-model="drawer"
        temporary
      >
      <v-layout mt-4 column align-center>
        <v-flex>
          <v-avatar>
            <img v-bind:src="usuario.foto">
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="mt-4 mb-0 heading">{{usuario.nombre}}</p>
        </v-flex>
          <v-icon>mdi-Settings</v-icon>
        <v-flex>
          <small>{{usuario.correo}}</small>
        </v-flex>

      </v-layout>

      <h4 class="ml-3 mt-4">Mis creaciones</h4>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="creacion in creaciones"
          :key="creacion.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ creacion.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ creacion.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <h4 class="ml-3 mt-4">Lecciones terminadas</h4>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="lec in lecTomadas"
          :key="lec.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ lec.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ lec.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </v-container>

</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        usuario: {
          nombre: 'Gustavo Davila',
          correo: 'davila7@utp.edu.co',
          foto: 'https://randomuser.me/api/portraits/men/78.jpg'
        },
        creaciones: [
          { title: 'Encuentra el socio corecto', icon: 'mdi-view-dashboard' },
          { title: 'Marketing voz a voz', icon: 'mdi-forum' },
        ],
        lecTomadas: [
          { title: 'El logo percecto', icon: 'mdi-view-dashboard', terminada: true},
          { title: 'Clusters', icon: 'mdi-forum', terminada: true},
        ],
      }
    },
  }
</script>

