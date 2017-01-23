"use strict";
const _1 = require("../");
const parser_1 = require("../../parser");
const EXP_NAME = 'help';
function createExpression(currentToken, tokens, ast) {
    const passExpression = new _1.Expression(EXP_NAME);
    if (!tokens.length) {
        return console.warn('[Caution] PASS: No vaild argument is provided.');
    }
    const passwordArg = tokens.shift();
    passExpression.insertArg(passwordArg.type === 'word' && new parser_1.StringLiteral(passwordArg.value));
    ast.insertExpression(passExpression);
}
exports.createExpression = createExpression;
