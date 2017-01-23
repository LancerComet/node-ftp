"use strict";
const appConfig = require('../config.json');
const net = require("net");
const process = require("process");
const utils = require("./utils");
const client_on_connect_1 = require("./client-on-connect");
createLocalServer();
function createLocalServer() {
    const server = net.createServer(socket => {
        socket.write(utils.addBackspace('Node-FTP (v0.1.0)\r\n'));
    });
    server.on('connection', client_on_connect_1.default);
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
//# sourceMappingURL=index.js.map