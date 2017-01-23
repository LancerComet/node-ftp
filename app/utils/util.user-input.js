"use strict";
const cmder = require("../cmder");
function getUsername(userInput) {
    const tokens = cmder.tokenizer(userInput);
    const ast = cmder.parser(tokens);
    try {
        const userExp = ast.body[0];
        return userExp.name === 'USER'
            ? userExp.arguments[0].value.toString()
            : '';
    }
    catch (tryErr) {
        return '';
    }
}
exports.getUsername = getUsername;
function getPassword(userInput) {
    const tokens = cmder.tokenizer(userInput);
    const ast = cmder.parser(tokens);
    try {
        const userExp = ast.body[0];
        return userExp.name === 'PASS'
            ? userExp.arguments[0].value.toString()
            : '';
    }
    catch (tryErr) {
        return '';
    }
}
exports.getPassword = getPassword;
function commonFunc(condition, str) {
    const match = str.match(new RegExp(`^${condition}.+`));
    if (!match)
        return '';
    const result = match[0].replace(`${condition} `, '');
    return result;
}
//# sourceMappingURL=util.user-input.js.map