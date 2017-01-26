"use strict";
const _1 = require('../');
function USER(clientInput, client) {
    let username = '';
    try {
        username = _1.valueExtracter('USER', clientInput);
    }
    catch (tryErr) {
    }
    client.setLoginUsername(username);
    client.askForPassword();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = USER;
