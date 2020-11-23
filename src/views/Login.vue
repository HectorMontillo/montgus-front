<template>
  <v-container class="fill-height" fluid>
    <span class="bg-image"></span>
    <v-row align="center" justify="center">
      <v-col cols="7" sm="5">
        <v-img
          max-height="128"
          max-width="350"
          :src="imageUrl + 'logowhite.png'"
          class="mx-auto mb-12"
        ></v-img
      ></v-col>
      <v-col cols="12" sm="8" md="8">
        <v-card class="mx-auto elevation-12" max-width="500">
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
          </v-card-title>

          <v-window v-model="step">
            <!-- Login -->
            <v-window-item :value="1">
              <v-card-text>
                <v-form v-model="login.valid">
                  <v-text-field
                    v-model="login.email"
                    :rules="[rules.required, rules.emailMatch]"
                    type="text"
                    name="email"
                    label="Correo Electrónico"
                    class="mb-5"
                  ></v-text-field>
                  <v-text-field
                    v-model="login.password"
                    :append-icon="login.show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="login.show ? 'text' : 'password'"
                    name="pass"
                    label="Contraseña"
                    counter
                    @click:append="login.show = !login.show"
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-window-item>

            <!-- Signup -->
            <v-window-item :value="2">
              <v-card-text>
                <v-text-field label="Password" type="password"></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  Please enter a password for your account
                </span>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <!-- Signup & sigin buttom -->
          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  block
                  color="primary"
                  elevation="2"
                  class="grey--text text--darken-3"
                  @click="step === 1 ? ingresar() : registar()"
                  :disabled="step === 1 ? !login.valid : false"
                  >{{ step === 1 ? "Ingresar" : "Registrarse" }}</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn block outlined color="primary" @click="next()">{{
                  step === 1 ? "Registrarse" : "Iniciar Sesión"
                }}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authService from "../services/auth";

export default {
  data: () => ({
    step: 1,
    imageUrl: process.env.VUE_APP_SERVER + "/images/",
    login: {
      valid: true,
      email: "",
      password: "",
      show: false,
    },
    rules: {
      required: (value) => !!value || "Requerido.",
      min: (v) => v.length >= 6 || "Mínimo 6 caracteres.",
      emailMatch: (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    },
  }),
  methods: {
    async ingresar() {
      try {
        const response = await authService.login({
          email: this.login.email,
          password: this.login.password,
        });
        this.$store.commit("raiseMsg", "Bienvenido!");
        localStorage.setItem("jwt", response.token);
      } catch (error) {
        this.login.password = "";
        this.$store.commit("raiseError", error.mensaje);
      }
    },
    registrar() {},
    next() {
      if (this.step === 1) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Iniciar Sesion";
        case 2:
          return "Registrarse";
        default:
          return "Account created";
      }
    },
  },
};
</script>

<style scoped>
.bg-image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url("http://localhost:3000/images/background_image.jpg") no-repeat center
      center;

  background-size: cover;
  /*transform: scale(1.1);*/
}
</style>