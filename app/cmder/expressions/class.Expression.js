"use strict";
class Expression {
    constructor(name) {
        this.type = 'CallExpression';
        this.arguments = [];
        this.name = name;
    }
    insertArg(argument) {
        this.arguments.push(argument);
    }
}
exports.Expression = Expression;
