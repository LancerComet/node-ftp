"use strict";
const parser_1 = require("../../parser");
const _1 = require("../");
const parser_2 = require("../../parser");
const transformer_1 = require("../../transformer");
const utils_1 = require("../../utils");
const EXP_NAME = 'remove';
function createExpression(currentToken, tokens, ast) {
    const removeExpression = new _1.Expression(EXP_NAME);
    const elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        removeExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`);
    }
    ast.insertExpression(removeExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    const variableName = expression.arguments.shift().value;
    const srcElement = transformer_1.VARIABLE_HASH[variableName].value;
    if (srcElement === undefined)
        utils_1.errorHandler.undefinedError(`${variableName} is undefined.`);
    if (typeof srcElement !== 'object' ||
        (srcElement.nodeName === undefined && srcElement.nodeType === undefined))
        utils_1.errorHandler.typeError(`${variableName} isn't a HTML Element.`);
    const parentElement = srcElement.parentElement;
    expFunc(parentElement, srcElement);
}
exports.run = run;
function expFunc(parentElement, targetElement) {
    parentElement.removeChild(targetElement);
}
exports.expFunc = expFunc;
//# sourceMappingURL=exp.remove.js.map