"use strict";
function valueExtracter(command, content) {
    const match = content.match(new RegExp(`^${command}.+`));
    if (!match) {
        return '';
    }
    try {
        const result = match[0].replace(`${command} `, '');
        return result;
    }
    catch (tryErr) {
        return '';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = valueExtracter;
