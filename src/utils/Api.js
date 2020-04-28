import axios from "axios";

export const serverAddress =
  process.env.NODE_ENV === "development"
    ? "http://rcon.us-west-2.elasticbeanstalk.com"
    : "rcon.us-west-2.elasticbeanstalk.com";

export const Api = {
  login(payload) {
    return axios
      .post(`${serverAddress}/api/v1/login`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },

  checkLoggedIn() {
    return axios
      .get(`${serverAddress}/api/v1/logged_in`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },

  signup(payload) {
    return axios
      .post(`${serverAddress}/api/v1/signup`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },

  updateUser(payload) {
    return axios
      .patch(`${serverAddress}/api/v1/users/${payload.id}`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  deleteUser(id) {
    return axios
      .delete(`${serverAddress}/api/v1/users/${id}`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  logout() {
    return axios
      .post(`${serverAddress}/api/v1/logout`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  sendClientOrder(payload) {
    return axios
      .post(`${serverAddress}/api/v1/orders`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  loadOrders() {
    return axios
      .get(`${serverAddress}/api/v1/my_orders`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  deleteOrder(payload) {
    return axios
      .delete(`${serverAddress}/api/v1/orders/${payload}`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  editClientOrder(payload) {
    return axios
      .patch(`${serverAddress}/api/v1/orders/${payload.id}`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  fetchRealtorsList(payload) {
    let url = `${serverAddress}/api/v1/list_realtors/?page=${payload.page}&per_page=${payload.per_page}`;
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
      .patch(`${serverAddress}/api/v1/realtor_ratings/${payload.id}`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  createRating(payload) {
    return axios
      .post(`${serverAddress}/api/v1/realtor_ratings`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  sendRealtorProfile(payload) {
    return axios
      .post(`${serverAddress}/api/v1/realtor_profiles/`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  editRealtorProfile(payload) {
    return axios
      .patch(
        `${serverAddress}/api/v1/realtor_profiles/${payload.get("id")}`,
        payload
      )
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  fetchClientOrdersList(payload) {
    let url = `${serverAddress}/api/v1/orders/?page=${payload.page}&per_page=${payload.per_page}`;
    if (payload.state) {
      url = `${url}&state=${payload.state}`;
    }
    if (payload.type) {
      url = `${url}&order_type=${payload.type}`;
    }

    if (payload.zip) {
      url = `${url}&zip=${payload.zip}`;
    }

    return axios
      .get(url)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  loadRespondedOrdersList() {
    return axios
      .get(`${serverAddress}/api/v1/responded_orders`)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  mailRealtorProfile(payload) {
    return axios
      .post(`${serverAddress}/api/v1/send_realtor_profile`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  },
  mailMyOrders(payload) {
    return axios
      .post(`${serverAddress}/api/v1/send_my_orders`, payload)
      .then(response => response.data)
      .catch(error => Promise.reject(error.response.data));
  }
};
