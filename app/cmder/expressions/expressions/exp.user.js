"use strict";
const _1 = require("../");
const parser_1 = require("../../parser");
const EXP_NAME = 'USER';
function createExpression(currentToken, tokens, ast) {
    const userExpression = new _1.Expression(EXP_NAME);
    if (!tokens.length) {
        return console.warn('[Caution] USER: No vaild argument is provided.');
    }
    const usernameArg = tokens.shift();
    userExpression.insertArg(usernameArg.type === 'word' && new parser_1.StringLiteral(usernameArg.value));
    ast.insertExpression(userExpression);
}
exports.createExpression = createExpression;
