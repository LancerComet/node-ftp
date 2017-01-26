"use strict";
const _1 = require('../');
function commander(userCmd, client) {
    const matching = userCmd.match(/^\S+/);
    if (!matching) {
        return '';
    }
    const cmd = matching[0].toLowerCase();
    if (!_1.cmds[cmd]) {
        return '';
    }
    try {
        return _1.cmds[cmd](userCmd, client);
    }
    catch (tryErr) {
        console.error(`[Error] Commander Error: ${tryErr}`);
        return '';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = commander;
