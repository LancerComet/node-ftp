"use strict";
const KEYWORD_LIST = [
    'as', 'to', 'from'
];
class Keyword {
    constructor(value) {
        this.type = 'keyword';
        this.value = value;
    }
}
exports.Keyword = Keyword;
function isKeyword(target) {
    return KEYWORD_LIST.indexOf(target) > -1;
}
exports.isKeyword = isKeyword;
//# sourceMappingURL=class.Keyword.js.map