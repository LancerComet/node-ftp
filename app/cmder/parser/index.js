"use strict";
const class_AST_1 = require("./class.AST");
exports.AST = class_AST_1.AST;
const class_Literal_1 = require("./class.Literal");
exports.Literal = class_Literal_1.Literal;
exports.NumberLiteral = class_Literal_1.NumberLiteral;
exports.StringLiteral = class_Literal_1.StringLiteral;
exports.ExpressionLiteral = class_Literal_1.ExpressionLiteral;
const expressions = require("../expressions");
function parser(tokens = []) {
    if (!tokens.length) {
        return false;
    }
    const ast = new class_AST_1.AST('Expression');
    while (tokens.length > 0) {
        let currentToken = tokens.shift();
        if (currentToken.type === 'word') {
            const tokenValue = currentToken.value;
            expressions[tokenValue] && expressions[tokenValue].createExpression(currentToken, tokens, ast);
        }
    }
    return ast;
}
exports.parser = parser;
//# sourceMappingURL=index.js.map