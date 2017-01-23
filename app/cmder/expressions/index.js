"use strict";
const USER = require("./expressions/exp.user");
exports.USER = USER;
const PASS = require("./expressions/exp.pass");
exports.PASS = PASS;
const class_Expression_1 = require("./class.Expression");
exports.Expression = class_Expression_1.Expression;
const class_Variable_1 = require("./class.Variable");
exports.Variable = class_Variable_1.Variable;
exports.EXPRESSION_LIST = [
    'USER', 'PASS',
    'help'
];
