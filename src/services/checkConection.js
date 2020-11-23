import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

async function checkConection() {
  try {
    await axios.get("/api");
  } catch (error) {
    store.commit("raiseError", "Comprube su conexión a internet");
  }
}

export default checkConection;
