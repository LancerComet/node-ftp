"use strict";
const parser_1 = require("../../parser");
const _1 = require("../");
const parser_2 = require("../../parser");
const transformer_1 = require("../../transformer");
const utils_1 = require("../../utils");
const EXP_NAME = 'create';
function createExpression(currentToken, tokens, ast) {
    const createExpression = new _1.Expression(EXP_NAME);
    const tagNameArg = tokens.shift();
    tagNameArg.type === 'word'
        ? createExpression.insertArg(new parser_2.StringLiteral(tagNameArg.value))
        : utils_1.errorHandler.typeError('A HTML tag name can\'t be a number.');
    const asArg = tokens.shift();
    asArg.value === 'as'
        ? createExpression.insertArg(new parser_1.Keyword(asArg.value))
        : utils_1.errorHandler.typeError(`A keyword "as" must be provided after HTML tag name in "${EXP_NAME}" expression.`);
    const elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        createExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`);
    }
    ast.insertExpression(createExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    const tagName = expression.arguments.shift();
    if (tagName.type !== 'StringLiteral' || typeof tagName.value !== 'string') {
        utils_1.errorHandler.typeError('You must use a string as your tag name.');
    }
    const asKeyword = expression.arguments.shift();
    if (asKeyword.type !== 'keyword' || asKeyword.value !== 'as') {
        utils_1.errorHandler.syntaxError('"as" must be followed after "${tagName}" in "create" expression.');
    }
    const variableName = expression.arguments.shift().value;
    const variableValue = document.createElement(tagName.value);
    expFunc(variableName, new _1.Variable(variableName, variableValue));
}
exports.run = run;
function expFunc(variableName, newVarialbe) {
    transformer_1.VARIABLE_HASH[variableName] = newVarialbe;
}
exports.expFunc = expFunc;
//# sourceMappingURL=exp.create.js.map