import axios from "axios";
//import FormData from "form-data";
import authHeaders from "./authHeaders";

async function createLeccion(data) {
  const formData = new FormData();
  formData.append("portada", data.file);
  formData.append("nombre", data.nombre);
  formData.append("descripcion", data.descripcion);

  const config = {
    method: "post",
    url: "/api/lecciones",
    headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
    data: formData,
  };

  const response = await axios(config);
  return response.data;
}

async function setContentLeccion(id, slides) {
  const config = {
    method: "post",
    url: "/api/lecciones/" + id,
    headers: authHeaders(),
    data: { slides },
  };

  const response = await axios(config);
  return response.data;
}

export default {
  createLeccion,
  setContentLeccion,
};
