const fetch = require("cross-fetch");

const { api } = require("../config");

module.exports.getUsers = () => {
  return fetch(`${api.endpoint}/api/users`)
    .then((res) => res.json())
    .then(({ data }) => data);
};

module.exports.getUserById = (id) => {
  return fetch(`${api.endpoint}/api/users/${id}`)
    .then((res) => res.json())
    .then(({ data }) => data);
};

// @TODO add a POST request to create a new user
