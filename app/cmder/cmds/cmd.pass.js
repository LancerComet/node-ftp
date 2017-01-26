"use strict";
const _1 = require('../');
function PASS(clientInput, client) {
    let password = '';
    try {
        password = _1.valueExtracter('PASS', clientInput);
    }
    catch (tryErr) {
    }
    client.setLoginPassword(password);
    client.loginAuth();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PASS;
