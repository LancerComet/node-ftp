"use strict";
class Token {
    constructor(type = '', value) {
        this.type = type;
        this.value = value;
    }
}
exports.Token = Token;
class WordToken extends Token {
    constructor(value) {
        super('word', value);
    }
}
exports.WordToken = WordToken;
