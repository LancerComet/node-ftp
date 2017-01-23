"use strict";
const _1 = require("../");
const parser_1 = require("../../parser");
const EXP_NAME = 'USER';
function createExpression(currentToken, tokens, ast) {
    const userExpression = new _1.Expression(EXP_NAME);
    const usernameArg = tokens.shift();
    userExpression.insertArg(usernameArg.type === 'word'
        ? new parser_1.StringLiteral(usernameArg.value)
        : new parser_1.NumberLiteral(usernameArg.value));
    ast.insertExpression(userExpression);
}
exports.createExpression = createExpression;
//# sourceMappingURL=exp.user.js.map