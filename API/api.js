const axios = require('axios');
const api = axios.create({
    baseURL:"https://api.github.com/",
});
api.defaults.headers.common['Authorization']="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"

module.exports = api;