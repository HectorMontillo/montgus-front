import axios from "axios";
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
    url: "/api/lecciones/content/" + id,
    headers: authHeaders(),
    data: { slides },
  };

  const response = await axios(config);
  return response.data;
}

async function eliminarLeccion(id) {
  const config = {
    method: "delete",
    url: "/api/lecciones/" + id,
    headers: authHeaders(),
  };

  const response = await axios(config);
  return response.data;
}

async function updateLeccionData(id, data, file) {
  const formData = new FormData();

  if (file) formData.append("portada", file);

  formData.append("nombre", data.nombre);
  formData.append("descripcion", data.descripcion);

  const config = {
    method: "put",
    url: "/api/lecciones/" + id,
    headers: { ...authHeaders(), "Content-Type": "multipart/form-data" },
    data: formData,
  };

  const response = await axios(config);
  return response.data;
}

async function getContentLeccion(id) {
  const config = {
    method: "get",
    url: "/api/lecciones/content/" + id,
    headers: authHeaders(),
  };

  const response = await axios(config);
  return response.data;
}

async function getLeccionesCreadas() {
  const config = {
    method: "get",
    url: "/api/lecciones/creadas",
    headers: authHeaders(),
  };

  const response = await axios(config);
  return response.data;
}

async function getLeccionesRecomendadas() {
  const config = {
    method: "get",
    url: "/api/lecciones/recomendadas",
    headers: authHeaders(),
  };

  const response = await axios(config);
  return response.data;
}

async function tomarLeccion(id) {
  const config = {
    method: "post",
    url: "/api/lecciones/take/" + id,
    headers: authHeaders(),
  };

  const response = await axios(config);
  return response.data;
}

async function terminarLeccion(id, rating) {
  const config = {
    method: "post",
    url: "/api/lecciones/finish/" + id,
    headers: authHeaders(),
    data: {
      rating,
    },
  };

  const response = await axios(config);
  return response.data;
}

async function leccionesSinTerminar() {
  const config = {
    method: "get",
    url: "/api/lecciones/not_finished/",
    headers: authHeaders(),
  };

  const response = await axios(config);
  return response.data;
}

export default {
  createLeccion,
  setContentLeccion,
  getLeccionesCreadas,
  getLeccionesRecomendadas,
  getContentLeccion,
  updateLeccionData,
  eliminarLeccion,
  tomarLeccion,
  terminarLeccion,
  leccionesSinTerminar,
};
