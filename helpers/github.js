const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
  return axios(options)
    .then((res) => res.data);
}

let getUserByUsername = (username) => {
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
  return axios(options)
    .then((res) => {
      return res.data;
    });
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.getUserByUsername = getUserByUsername;