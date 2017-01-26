"use strict";
function QUIT(clientInput, client) {
    client.disconnect();
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QUIT;
