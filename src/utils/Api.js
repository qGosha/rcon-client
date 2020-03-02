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
      .catch(error => Promise.reject(error.response.data));
  },

  checkLoggedIn() {
    return axios
      .get(`${serverAdress}/api/v1/logged_in`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },

  signup(payload) {
    return axios
      .post(`${serverAdress}/api/v1/signup`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },

  updateUser(payload) {
    return axios
      .patch(`${serverAdress}/api/v1/users/${payload.id}`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },

  logout() {
    return axios
      .post(`${serverAdress}/api/v1/logout`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  sendClientOrder(payload) {
    return axios
      .post(`${serverAdress}/api/v1/orders`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  loadOrders() {
    return axios
      .get(`${serverAdress}/api/v1/my_orders`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  deleteOrder(payload) {
    return axios
      .delete(`${serverAdress}/api/v1/orders/${payload}`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  editClientOrder(payload) {
    return axios
      .patch(`${serverAdress}/api/v1/orders/${payload.id}`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  fetchRealtorsList(payload) {
    let url = `${serverAdress}/api/v1/list_realtors/?page=${payload.page}&per_page=${payload.per_page}`;
    if (payload.state) {
      url = `${url}&state=${payload.state}`;
    }
    return axios
      .get(url)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  updateRating(payload) {
    return axios
      .patch(`${serverAdress}/api/v1/realtor_ratings/${payload.id}`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  createRating(payload) {
    return axios
      .post(`${serverAdress}/api/v1/realtor_ratings`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  }
};
