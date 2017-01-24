"use strict";
const _1 = require("../");
function commandReader(userCmd, client) {
    let matching = userCmd.match(/^\S+/);
    if (!matching) {
        return '';
    }
    let cmd = matching[0];
    if (!_1.cmds[cmd]) {
        return '';
    }
    try {
        return _1.cmds[cmd](userCmd, client);
    }
    catch (tryErr) {
        console.error(`[Error] ${tryErr}`);
        return '';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = commandReader;
