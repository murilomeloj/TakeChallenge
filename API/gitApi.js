const axios = require('axios');
const api = axios.create({
    baseURL:"https://api.github.com/",
});
api.defaults.headers.common['Authorization']="token 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"

module.exports = api;