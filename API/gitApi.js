const axios = require('axios');
const api = axios.create({
    baseURL:"https://api.github.com/",
});
api.defaults.headers.common['Authorization']="token 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"

module.exports = api;