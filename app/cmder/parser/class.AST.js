"use strict";
class AST {
    constructor(type = '', body = []) {
        this.type = type;
        this.body = body;
    }
    insertExpression(expression) {
        this.body.push(expression);
    }
}
exports.AST = AST;
