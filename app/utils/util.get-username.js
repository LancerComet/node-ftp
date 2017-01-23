"use strict";
function getUsername(str) {
    const match = str.match(/^USER.+/);
    if (!match)
        return '';
    const username = match[0].replace('USER ', '');
    return username;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUsername;
//# sourceMappingURL=util.get-username.js.map