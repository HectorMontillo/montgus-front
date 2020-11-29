import axios from "axios";

async function login(data) {
  const config = {
    method: "post",
    url: "/api/login",
    data,
  };

  const response = await axios(config);
  return response.data;
}

async function signup(data) {
  const config = {
    method: "post",
    url: "/api/signup",
    data,
  };

  const response = await axios(config);
  return response.data;
}
export default {
  login,
  signup,
};
