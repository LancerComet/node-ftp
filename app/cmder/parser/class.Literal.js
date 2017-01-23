"use strict";
class Literal {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
exports.Literal = Literal;
class StringLiteral extends Literal {
    constructor(value) {
        super('StringLiteral', value);
    }
}
exports.StringLiteral = StringLiteral;
class ExpressionLiteral extends Literal {
    constructor(value) {
        super('expression', value);
    }
}
exports.ExpressionLiteral = ExpressionLiteral;
