"use strict";
const class_Token_1 = require("./class.Token");
exports.Token = class_Token_1.Token;
exports.WordToken = class_Token_1.WordToken;
function tokenizer(code) {
    return code.split(/\s+/)
        .filter(words => words.length > 0)
        .map(words => new class_Token_1.WordToken(words));
}
exports.tokenizer = tokenizer;
