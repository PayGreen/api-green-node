require('dotenv').config('/.env');
const { Mode } = require('../../src/enums');

const localConfig = {
    token: process.env.SDK_TOKEN,
    refreshToken: process.env.SDK_REFRESHTOKEN,
    mode: process.env.SDK_MODE ? Mode[process.env.SDK_MODE] : null,
    host: process.env.SDK_HOST || null,
};

module.exports = { localConfig };
