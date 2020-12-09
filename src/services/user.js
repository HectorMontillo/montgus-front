import axios from "axios";
//import FormData from "form-data";
import authHeaders from "./authHeaders";

async function getUser() {
  const config = {
    method: "get",
    url: "/api/users",
    headers: authHeaders(),
  };

  const response = await axios(config);
  return response.data;
}

export default {
  getUser,
};
