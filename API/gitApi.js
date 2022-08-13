const axios = require('axios');
const api = axios.create({
    baseURL:"https://api.github.com/",
});
api.defaults.headers.common['Authorization']="token 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"

module.exports = api;