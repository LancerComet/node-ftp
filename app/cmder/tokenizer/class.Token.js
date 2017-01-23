"use strict";
class Token {
    constructor(type = '', value) {
        this.type = type;
        this.value = value;
    }
}
exports.Token = Token;
class NumberToken extends Token {
    constructor(value) {
        super('number', value);
    }
}
exports.NumberToken = NumberToken;
class WordToken extends Token {
    constructor(value) {
        super('word', value);
    }
}
exports.WordToken = WordToken;
//# sourceMappingURL=class.Token.js.map