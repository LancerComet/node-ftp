"use strict";
const _1 = require('../');
function USER(clientInput, client) {
    if (process.env.NODE_ENV === 'development') {
        console.log('[Info] Client ask server to work in "PORT" mode.');
    }
    let port = '';
    try {
        port = _1.valueExtracter('PORT', clientInput);
    }
    catch (tryErr) {
        client.errorCmd();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = USER;
