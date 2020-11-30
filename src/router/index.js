import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import CreateLesson from "../views/CreateLesson.vue";

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
    path: "/create",
    name: "Create",
    component: CreateLesson,
    meta: {
      title: "Create - Montgus",
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
