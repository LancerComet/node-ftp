"use strict";
const _1 = require("../");
const parser_1 = require("../../parser");
const EXP_NAME = 'PASS';
function createExpression(currentToken, tokens, ast) {
    const passExpression = new _1.Expression(EXP_NAME);
    const passwordArg = tokens.shift();
    passExpression.insertArg(passwordArg.type === 'word'
        ? new parser_1.StringLiteral(passwordArg.value)
        : new parser_1.NumberLiteral(passwordArg.value));
    ast.insertExpression(passExpression);
}
exports.createExpression = createExpression;
//# sourceMappingURL=exp.pass.js.map