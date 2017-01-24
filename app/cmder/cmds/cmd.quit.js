"use strict";
function quit(userInput, client) {
    client.disconnect('200 Bye.');
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quit;
