"use strict";
const DEFINITION = require('../def');
const cmder_1 = require('../cmder');
const utils_1 = require('../utils');
const appConfig = require('../../config.json');
class Client {
    constructor(socket) {
        this.inited = false;
        this.isLogin = false;
        this._retrying = 0;
        this.clientRawData = '';
        this.authInput = {
            username: '',
            password: ''
        };
        this.socket = socket;
        this.setup();
        this.registerEvents();
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
    resetClientRawData() {
        this.clientRawData = '';
    }
    write(content) {
        this.socket.write(new Buffer((new RegExp(`.+${DEFINITION.CRLF}$`).test(content) ? content : content += DEFINITION.CRLF)));
    }
    errorCmd() {
        this.write('500 Error.');
    }
    disconnect(content = '200 Bye.') {
        this.write(content);
        this.socket.destroy();
    }
    setLoginUsername(username) {
        this.authInput.username = username;
    }
    setLoginPassword(password) {
        this.authInput.password = password;
    }
    registerEvents() {
        if (this.inited) {
            return;
        }
        const socket = this.socket;
        const clientInfo = this.clientInfo;
        socket.on('error', this.onError);
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
    onError(error) {
        console.error(`[Error] An error is occured: `, error);
    }
    onCommandConfirm() {
        const client = this;
        const userCmd = this.clientRawData;
        if (process.env.NODE_ENV === 'development') {
            console.log('Command send: ', userCmd);
        }
        if (this.isLogin || /^(USER|PASS|HELP|QUIT|EXIT)/i.test(userCmd)) {
            cmder_1.commander(userCmd, client);
        }
        this.resetClientRawData();
    }
    loginAuth() {
        const userInputUsername = this.authInput.username;
        const userInputPassword = this.authInput.password;
        const definedPassword = utils_1.auth.getPassword(userInputUsername);
        console.log('username: ', userInputUsername);
        console.log('definedPassword: ', definedPassword);
        console.log('password entered: ', userInputPassword);
        if (definedPassword === false || userInputPassword !== definedPassword) {
            this.write('530 Login incorrect, username or password is wrong.');
        }
        else {
            this.loginSuccessfully();
        }
    }
    loginSuccessfully() {
        console.log(`[Info] New client from ${this.clientInfo.address}:${this.clientInfo.port} is connected successfully.`);
        this.isLogin = true;
        this.write(`230---- Welcome back, ${this.authInput.username}! ----`);
        this.write(`230-Feel free to use commands to control files.`);
        this.write(`230 Login Successful.`);
    }
    sendGreetingInfo() {
        return new Promise((resolve, reject) => {
            this.write('220 Greeting from NODE-FTP! :)');
            resolve(this.socket);
        });
    }
    askForUsername() {
    }
    askForPassword() {
        this.write('331 Please provide your password.');
    }
    setup() {
        this.clientInfo = {
            address: this.socket.remoteAddress,
            port: this.socket.remotePort
        };
        this.socket.setKeepAlive(true);
    }
}
Client.MAX_RETRYING_TIME = 3;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
