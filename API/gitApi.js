const axios = require('axios');
const api = axios.create({
    baseURL:"https://api.github.com/",
});
api.defaults.headers.common['Authorization']=`token ${process.env.SECRET_API}` //get token previously stored in a enviromental variable

module.exports = api;