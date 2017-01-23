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
const DEFINITION = require("./def");
const utils = require("./utils");
class Client {
    constructor(socket) {
        this.status = 0;
        this.socket = socket;
        this.clientInfo = {
            address: socket.remoteAddress,
            port: socket.remotePort
        };
        this.registerEvents();
    }
    registerEvents() {
        const socket = this.socket;
        const clientInfo = this.clientInfo;
        socket.on('connect', () => {
            console.log('new client is connected.');
        });
        socket.on('error', err => {
            console.error(`[Error] A new error has occured when ${clientInfo.address}:${clientInfo.port} was connecting:`, err);
        });
        socket.on('data', (data) => {
            console.log('data is coming: ', data);
            if (data.toString() === DEFINITION.CRLF) {
                console.log('enter triggered.');
            }
        });
        socket.on('drain', () => {
            console.log('ondrain');
        });
        socket.on('end', () => {
            console.log('end');
        });
    }
    sendGrretingInfo() {
        return new Promise((resolve, reject) => {
            const resopnse = utils.addBackspace('220 Greeting from NODE-FTP! :)\n');
            this.socket.write(resopnse);
            resolve(this.socket);
        });
    }
    askForUsername() {
        const socket = this.socket;
        return new Promise((resolve, reject) => {
            if (!appConfig.username)
                return resolve(socket);
            const response = utils.addBackspace('220 Please provide your username.\r\n');
            socket.write(response);
            resolve(socket);
        });
    }
    askForPassword() {
        const socket = this.socket;
        return new Promise((resolve, reject) => {
            if (!appConfig.username)
                return resolve(socket);
            const response = utils.addBackspace('331 Please provide your password.\r\n');
            socket.write(response);
            resolve(socket);
        });
    }
}
function clientOnConnect(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new Client(socket);
        yield client.sendGrretingInfo();
        yield client.askForUsername();
        yield client.askForPassword();
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clientOnConnect;
//# sourceMappingURL=client-on-connect.js.map