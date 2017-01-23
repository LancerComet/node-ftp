"use strict";
const parser_1 = require("../../parser");
const _1 = require("../");
const expressions = require("../");
const parser_2 = require("../../parser");
const transformer_1 = require("../../transformer");
const utils_1 = require("../../utils");
const EXP_NAME = 'each';
function createExpression(currentToken, tokens, ast) {
    const eachExpression = new _1.Expression(EXP_NAME);
    const elementsArg = tokens.shift();
    if (!parser_1.isKeyword(elementsArg.value) && _1.EXPRESSION_LIST.indexOf(elementsArg.value) < 0) {
        eachExpression.insertArg(elementsArg.type === 'number'
            ? new parser_2.NumberLiteral(elementsArg.value)
            : new parser_2.StringLiteral(elementsArg.value));
    }
    else {
        utils_1.errorHandler.typeError('An element variable can not be a keyword or expression.');
    }
    const expressionArg = tokens.shift();
    if (_1.EXPRESSION_LIST.indexOf(expressionArg.value) > -1) {
        eachExpression.insertArg(new parser_2.ExpressionLiteral(expressionArg.value));
    }
    else {
        utils_1.errorHandler.throwError(`[Unknown Expression] Sadly I don't know the expression called "${expressionArg.value}". :(`);
    }
    const args = [tokens.shift(), tokens.shift()];
    args.forEach(arg => eachExpression.insertArg(arg.type === 'number' ? new parser_2.NumberLiteral(arg.value) : new parser_2.StringLiteral(arg.value)));
    ast.insertExpression(eachExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    const variableName = expression.arguments.shift().value;
    const srcElements = transformer_1.VARIABLE_HASH[variableName].value;
    if (srcElements === undefined)
        utils_1.errorHandler.undefinedError(`${variableName} is undefined.`);
    if (!srcElements.length)
        return;
    const expressionArg = expression.arguments.shift();
    if (!expressionArg.value)
        return;
    if (expressionArg.type !== 'expression') {
        utils_1.errorHandler.typeError('An expression must be followed after each in "each" expression.');
    }
    const nodes = Array.prototype.slice.call(srcElements);
    nodes.forEach(node => {
        const _expression = new _1.Expression(expressionArg.value);
        const _tempVarName = variableName + '_' + utils_1.uidGen();
        const _tempVar = new _1.Variable(_tempVarName, node);
        transformer_1.VARIABLE_HASH[_tempVarName] = _tempVar;
        _expression.insertArg(new parser_2.StringLiteral(_tempVarName));
        expression.arguments.forEach(arg => _expression.insertArg(arg));
        expressions[expressionArg.value] && expressions[expressionArg.value].run(_expression);
    });
}
exports.run = run;
//# sourceMappingURL=exp.each.js.map