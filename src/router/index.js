import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Creaciones from "../views/Creaciones.vue";
import CrearLeccion from "../views/CrearLeccion.vue";
import PostLeccion from "../views/PostLeccion.vue";
import ViewLeccion from "../views/ViewLeccion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login - Montgus",
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("jwt") == null) next();
      else next("/home");
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home - Montgus",
      requiresAuth: true,
    },
  },
  {
    path: "/creaciones",
    name: "Creaciones",
    component: Creaciones,
    meta: {
      title: "Mis creaciones - Montgus",
      requiresAuth: true,
    },
  },
  {
    path: "/crear_leccion",
    name: "CrearLeccion",
    component: CrearLeccion,
    meta: {
      title: "Crear leccion - Montgus",
      requiresAuth: true,
    },
  },
  {
    path: "/post_leccion",
    name: "PostLeccion",
    component: PostLeccion,
    meta: {
      title: "Crear leccion - Montgus",
      requiresAuth: true,
    },
  },
  {
    path: "/view_leccion/:leccionId",
    name: "ViewLeccion",
    component: ViewLeccion,
    meta: {
      title: "Crear leccion - Montgus",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const title = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  if (title) document.title = title.meta.title;
  else document.title = "Montgus";

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
