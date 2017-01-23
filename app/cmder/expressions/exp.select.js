"use strict";
const parser_1 = require("../../parser");
const _1 = require("../");
const parser_2 = require("../../parser");
const transformer_1 = require("../../transformer");
const utils_1 = require("../../utils");
const EXP_NAME = 'select';
function createExpression(currentToken, tokens, ast) {
    const selectExpression = new _1.Expression(EXP_NAME);
    const selectorArg = tokens.shift();
    selectExpression.insertArg(new parser_2.StringLiteral(selectorArg.value.toString()));
    const asArg = tokens.shift();
    asArg.value === 'as'
        ? selectExpression.insertArg(new parser_1.Keyword(asArg.value))
        : utils_1.errorHandler.typeError(`A keyword "as" must be provided after HTML tag name in "${EXP_NAME}" expression.`);
    const elementVariableArg = tokens.shift();
    if (!parser_1.isKeyword(elementVariableArg.value) && _1.EXPRESSION_LIST.indexOf(elementVariableArg.value) < 0) {
        selectExpression.insertArg(elementVariableArg.type === 'number'
            ? new parser_2.NumberLiteral(elementVariableArg.value)
            : new parser_2.StringLiteral(elementVariableArg.value));
    }
    else {
        utils_1.errorHandler.typeError(`You can't use a keyword or expression as a variable when calling "${EXP_NAME}".`);
    }
    ast.insertExpression(selectExpression);
}
exports.createExpression = createExpression;
function run(expression) {
    const selector = expression.arguments.shift();
    if (selector.type !== 'StringLiteral' || typeof selector.value !== 'string') {
        utils_1.errorHandler.typeError('You must use a string as your selector.');
    }
    var selectedElement = null;
    var _selected = document.querySelectorAll(selector.value);
    if (_selected.length === 1) {
        selectedElement = _selected[0];
    }
    else if (_selected.length > 1) {
        selectedElement = _selected;
    }
    const asKeyword = expression.arguments.shift();
    if (asKeyword.type !== 'keyword' || asKeyword.value !== 'as') {
        utils_1.errorHandler.syntaxError('"as" must be followed after "${tagName}" in "create" expression.');
    }
    const variableName = expression.arguments.shift().value;
    const variableValue = selectedElement;
    expFunc(variableName, new _1.Variable(variableName, variableValue));
}
exports.run = run;
function expFunc(variableName, newVarialbe) {
    transformer_1.VARIABLE_HASH[variableName] = newVarialbe;
}
exports.expFunc = expFunc;
//# sourceMappingURL=exp.select.js.map