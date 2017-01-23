"use strict";
const parser_1 = require("../../parser");
const _1 = require("../");
const parser_2 = require("../../parser");
const transformer_1 = require("../../transformer");
const utils_1 = require("../../utils");
const EXP_NAME = 'style';
function createExpression(currentToken, tokens, ast) {
    const styleExpression = new _1.Expression(EXP_NAME);
    const elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        styleExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`);
    }
    const stylePropArg = tokens.shift();
    stylePropArg.type === 'word'
        ? styleExpression.insertArg(new parser_2.StringLiteral(stylePropArg.value))
        : utils_1.errorHandler.typeError('A css style properity must be a string.');
    const styleValueArg = tokens.shift();
    styleExpression.insertArg(new parser_2.StringLiteral(styleValueArg.value));
    ast.insertExpression(styleExpression);
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
    const cssProperityName = expression.arguments.shift();
    const _cssPropVal = cssProperityName.value;
    if (cssProperityName.type !== 'StringLiteral' || typeof _cssPropVal !== 'string') {
        utils_1.errorHandler.typeError(`CSS properity is string-typed. "${_cssPropVal}" is not a string.`);
    }
    const cssProperityValue = expression.arguments.shift().value;
    expFunc(srcElement, _cssPropVal, cssProperityValue);
}
exports.run = run;
function expFunc(element, properityName, properityValue) {
    element.style[properityName] = properityValue;
}
//# sourceMappingURL=exp.style.js.map