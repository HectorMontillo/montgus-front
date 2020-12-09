import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    jwt: localStorage.getItem("jwt"),
    leccionEditId: null,
    error: false,
    msg: false,
    errorMsg: "",
    msgText: "",
  },
  getters: {
    jwt: (state) => {
      state.jwt = localStorage.getItem("jwt");
      return state.jwt;
    },
  },
  mutations: {
    setLeccionEditId(state, id) {
      state.leccionEditId = id;
    },
    setUser(state, user) {
      state.user = user;
    },
    raiseError(state, error) {
      state.error = true;
      state.errorMsg = error;
      setTimeout(() => {
        state.error = false;
        state.errorMsg = "";
      }, 4000);
    },
    dismissError(state) {
      state.error = false;
      state.errorMsg = "";
    },
    raiseMsg(state, msg) {
      state.msg = true;
      state.msgText = msg;
      setTimeout(() => {
        state.msg = false;
        state.msgText = "";
      }, 4000);
    },
    dismissMsg(state) {
      state.msg = false;
      state.msgText = "";
    },
  },
  actions: {},
  modules: {},
});
