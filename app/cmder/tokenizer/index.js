"use strict";
const class_Token_1 = require("./class.Token");
exports.Token = class_Token_1.Token;
exports.NumberToken = class_Token_1.NumberToken;
exports.WordToken = class_Token_1.WordToken;
function tokenizer(code) {
    return code.split(/\s+/)
        .filter(words => words.length > 0)
        .map((words) => isNaN(parseInt(words, 0))
        ? new class_Token_1.WordToken(words)
        : new class_Token_1.NumberToken(words));
}
exports.tokenizer = tokenizer;
//# sourceMappingURL=index.js.map