"use strict";
function getPassword(username) {
    const appConfig = require('../../config.json');
    const users = appConfig.users;
    const matching = users.filter(item => item.username === username)[0];
    return matching
        ? matching.password
        : false;
}
exports.getPassword = getPassword;
