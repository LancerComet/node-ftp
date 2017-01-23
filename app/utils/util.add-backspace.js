"use strict";
function addBackspace(str) {
    let length = str.length;
    while (length) {
        str += '\b';
        length--;
    }
    return str;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addBackspace;
