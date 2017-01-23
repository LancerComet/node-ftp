"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DEFINITION = require("../def");
const utils = require("../utils");
const appConfig = require('../../config.json');
class Client {
    constructor(socket) {
        this.status = 0;
        this.authInput = {
            username: '',
            password: ''
        };
        this.socket = socket;
        this.clientInfo = {
            address: socket.remoteAddress,
            port: socket.remotePort
        };
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
            const resopnse = utils.addBackspace('220 Greeting from NODE-FTP! :)\r\n\r\n');
            this.socket.write(resopnse);
            resolve(this.socket);
        });
    }
    askForUsername() {
        const socket = this.socket;
        return new Promise((resolve, reject) => {
            if (!appConfig.username)
                return resolve(socket);
            const response = utils.addBackspace('332 Please provide your username:\r\n');
            socket.write(response);
            const onData = (chunks) => {
                if (chunks.toString() !== DEFINITION.CRLF) {
                    data += chunks;
                    return;
                }
                const userInput = data;
                this.authInput.username = utils.getUsername(userInput);
                data = '';
                socket.removeListener('data', onData);
                resolve(socket);
            };
            let data = '';
            socket.on('data', onData);
        });
    }
    askForPassword() {
        const socket = this.socket;
        return new Promise((resolve, reject) => {
            if (!appConfig.username)
                return resolve(socket);
            const response = utils.addBackspace('331 Please provide your password:\r\n');
            socket.write(response);
            const onData = (chunks) => {
                if (chunks.toString() !== DEFINITION.CRLF) {
                    data += chunks;
                    return;
                }
                const userInput = data;
                this.authInput.password = utils.getPassword(userInput);
                data = '';
                const isAuthSuccess = utils.auth(this.authInput.username, this.authInput.password);
                if (isAuthSuccess) {
                    resolve(socket);
                }
                else {
                    const authFailedRes = utils.addBackspace('425 Username or password is wrong.\r\n\r\n');
                    socket.write(authFailedRes);
                    this.startAuth();
                }
                socket.removeListener('data', onData);
            };
            let data = '';
            socket.on('data', onData);
        });
    }
    startAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.askForUsername();
            yield this.askForPassword();
            console.log(`[Info] New client from ${this.clientInfo.address}:${this.clientInfo.port} is connected successfully.`);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
//# sourceMappingURL=model.client.js.map