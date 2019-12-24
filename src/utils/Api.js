import axios from "axios";

const serverAdress =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "http://my-app.herokuapp.com";

export const Api = {
  login(payload) {
    return axios
      .post(`${serverAdress}/api/v1/login`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },

  checkLoggedIn() {
    return axios
      .get(`${serverAdress}/api/v1/logged_in`)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  },

  signup(payload) {
    return axios
      .post(`${serverAdress}/api/v1/signup`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  }
};
