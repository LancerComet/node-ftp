"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const appConfig = require('../config.json');
const utils = require("./utils");
const model_1 = require("./model");
function clientOnConnect(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new model_1.Client(socket);
        yield client.sendGrretingInfo();
        yield client.startAuth();
        socket.write(utils.addBackspace(`Welcome back, ${appConfig.username}!\r\n`));
        client.registerEvents();
        console.log('[Info] Connection idle.');
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clientOnConnect;
//# sourceMappingURL=client-on-connect.js.map