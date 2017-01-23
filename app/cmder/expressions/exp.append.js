"use strict";
const parser_1 = require("../../parser");
const _1 = require("../");
const parser_2 = require("../../parser");
const transformer_1 = require("../../transformer");
const utils_1 = require("../../utils");
const EXP_NAME = 'append';
function createExpression(currentToken, tokens, ast) {
    const appendExpression = new _1.Expression(EXP_NAME);
    const srcElementArg = tokens.shift();
    elementExec(srcElementArg, appendExpression, 'source');
    const keywordArg = tokens.shift();
    keywordArg.value === 'to'
        ? appendExpression.insertArg(new parser_1.Keyword(keywordArg.value))
        : utils_1.errorHandler.typeError('A keyword must be followed after srouce element when using "append".');
    const targetElementArg = tokens.shift();
    elementExec(targetElementArg, appendExpression, 'target');
    ast.insertExpression(appendExpression);
}
exports.createExpression = createExpression;
function elementExec(elementArg, appendExpression, type) {
    if (!parser_1.isKeyword(elementArg.value) && _1.EXPRESSION_LIST.indexOf(elementArg.value) < 0) {
        appendExpression.insertArg(elementArg.type === 'number'
            ? new parser_2.NumberLiteral(elementArg.value)
            : new parser_2.StringLiteral(elementArg.value));
    }
    else {
        utils_1.errorHandler.typeError(`You can't use a keyword or expression as the name of ${type} element when calling "append".`);
    }
}
function run(expression) {
    const variableName = expression.arguments.shift().value;
    const srcElement = transformer_1.VARIABLE_HASH[variableName].value;
    if (srcElement === undefined)
        utils_1.errorHandler.undefinedError(`${variableName} is undefined.`);
    if (typeof srcElement !== 'object' ||
        (srcElement.nodeName === undefined && srcElement.nodeType === undefined))
        utils_1.errorHandler.typeError(`${variableName} isn't a HTML Element.`);
    const toKeyword = expression.arguments.shift();
    if (toKeyword.type !== 'keyword' || toKeyword.value !== 'to') {
        utils_1.errorHandler.syntaxError('"to" must be followed after "${variableName}" in "append" expression.');
    }
    const targetVariable = expression.arguments.shift().value;
    const targetElement = transformer_1.VARIABLE_HASH[targetVariable].value;
    if (targetElement === undefined)
        utils_1.errorHandler.undefinedError('${targetVariable} is undefined.');
    if (typeof targetElement !== 'object' ||
        (targetElement.nodeName === undefined && targetElement.nodeType === undefined))
        utils_1.errorHandler.typeError(`${variableName} isn't a HTML Element.`);
    expFunc(srcElement, targetElement);
}
exports.run = run;
function expFunc(srcElement, targetElement) {
    targetElement.appendChild(srcElement);
}
exports.expFunc = expFunc;
//# sourceMappingURL=exp.append.js.map