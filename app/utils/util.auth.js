"use strict";
const appConfig = require('../../config.json');
function auth(username, password) {
    return username === appConfig.username && password === appConfig.password;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
