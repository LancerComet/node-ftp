"use strict";
function uidGen() {
    return (Math.floor(Math.random() * 10000) * Date.now()).toString(16);
}
exports.uidGen = uidGen;
//# sourceMappingURL=util.uid-gen.js.map