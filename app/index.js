"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const appConfig = require('../config.json');
const packageJSON = require('../package.json');
const net = require('net');
const process = require('process');
const os = require('os');
const client_1 = require('./client');
const utils = require('./utils');
createLocalServer();
function createLocalServer() {
    const server = net.createServer(socket => {
        socket.write(utils.addBackspace(`220 Node-FTP (v${packageJSON.version}, running on ${os.type()}, ${os.arch()}.)\r\n220 # Carry Your World #\r\n`));
    });
    server.on('connection', clientOnConnect);
    server.on('error', err => {
        console.log('[Error] Error Occured when create ftp server: ', err);
        process.exit(1);
    });
    server.on('listening', () => {
        const info = server.address();
        console.log(`[Info] Server is on: ${info.address}:${info.port}`);
    });
    server.listen(appConfig.port_proto, appConfig.hostname);
}
function clientOnConnect(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new client_1.default(socket);
        yield client.sendGreetingInfo();
        yield client.startAuth();
        socket.write(utils.addBackspace(`\r\n230---- Welcome back, ${appConfig.username}! ----\r\n`));
        socket.write(utils.addBackspace(`230-Feel free to use commands to control files.\r\n`));
        socket.write(utils.addBackspace(`230 Login Successful.\r\n`));
        client.registerEvents();
        console.log('[Info] Connection idle.');
    });
}
