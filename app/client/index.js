"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const DEFINITION = require('../def');
const utils = require('../utils');
const cmder_1 = require('../cmder');
const appConfig = require('../../config.json');
class Client {
    constructor(socket) {
        this.inited = false;
        this._retrying = 0;
        this.clientRawData = '';
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
    get retrying() {
        return this._retrying;
    }
    set retrying(newVal) {
        if (this._retrying <= Client.MAX_RETRYING_TIME) {
            this._retrying = newVal;
        }
        else {
            this.disconnect('500 Error.');
        }
    }
    assignRetryingError() {
        this.retrying++;
    }
    getClientInfo() {
        return this.clientInfo;
    }
    getSocket() {
        return this.socket;
    }
    write(content) {
        this.socket.write(utils.addBackspace(content));
    }
    disconnect(content) {
        this.write(content || '');
        this.socket.destroy();
    }
    resetClientRawData() {
        this.clientRawData = '';
    }
    registerEvents() {
        if (this.inited) {
            return;
        }
        const socket = this.socket;
        const clientInfo = this.clientInfo;
        socket.on('error', err => {
            console.error(`[Error] A new error has occured when ${clientInfo.address}:${clientInfo.port} was connecting:`, err);
        });
        socket.on('data', (data) => {
            this.onData(data);
        });
        socket.on('drain', () => {
            console.log('ondrain');
        });
        socket.on('end', () => {
            console.log('end');
        });
        this.inited = true;
    }
    onData(data) {
        if (data.toString() === DEFINITION.CRLF) {
            this.onCommandConfirm();
        }
        else {
            this.clientRawData += data;
        }
    }
    onCommandConfirm() {
        const userCmd = this.clientRawData;
        if (process.env.NODE_ENV === 'development') {
            console.log('Command send: ', userCmd);
        }
        cmder_1.cmder(userCmd, this);
        this.resetClientRawData();
    }
    sendGreetingInfo() {
        return new Promise((resolve, reject) => {
            const resopnse = utils.addBackspace('\r\n220 Greeting from NODE-FTP! :)\r\n');
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
                    this.clientRawData += chunks;
                    return;
                }
                const userCmd = this.clientRawData;
                this.authInput.username = cmder_1.cmder(userCmd);
                this.resetClientRawData();
                socket.removeListener('data', onData);
                resolve(socket);
            };
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
                    this.clientRawData += chunks;
                    return;
                }
                socket.removeListener('data', onData);
                const userInput = this.clientRawData;
                this.authInput.password = cmder_1.cmder(userInput);
                this.resetClientRawData();
                const isAuthSuccess = utils.auth(this.authInput.username, this.authInput.password);
                if (isAuthSuccess) {
                    resolve(socket);
                }
                else {
                    const authFailedRes = utils.addBackspace('530 Username or password is wrong.\r\n\r\n');
                    socket.write(authFailedRes);
                    this.assignRetryingError();
                    reject();
                }
            };
            socket.on('data', onData);
        });
    }
    startAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.askForUsername();
                yield this.askForPassword();
            }
            catch (tryErr) {
                yield this.startAuth();
            }
            console.log(`[Info] New client from ${this.clientInfo.address}:${this.clientInfo.port} is connected successfully.`);
            return true;
        });
    }
}
Client.MAX_RETRYING_TIME = 3;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
