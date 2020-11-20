import axios from "axios";

async function login(data) {
  const config = {
    method: "post",
    url: "/api/login",
    data,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return err.response.data;
  }
}

export default {
  login,
};
