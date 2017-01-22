"use strict";
const net = require("net");
const HOSTNAME = 'localhost';
const FTP_PORT_DATA = 20;
const FTP_PORT_PROTO = 21;
const CRLF = '\r\n';
const ASCII = 'A';
const BINARY = 'I';
const IMAGE = 'I';
createLocalServer();
function createLocalServer() {
    const server = net.createServer(socket => {
        socket.write('Hello!');
    });
    server.on('connection', onClientConnect);
    server.on('error', err => {
        console.log('[Error] Error Occured when create ftp server: ', err);
    });
    server.on('listening', () => {
        const info = server.address();
        console.log(`[Info] Server is on: ${info.address}:${info.port}`);
    });
    server.listen(FTP_PORT_PROTO, HOSTNAME);
}
function onClientConnect(socket) {
    const clientInfo = {
        address: socket.remoteAddress,
        port: socket.remotePort
    };
    console.log('A client is here:', clientInfo);
    socket.on('connect', () => {
        console.log('new client is connected.');
    });
    socket.on('error', err => {
        console.error(`[Error] A new error has occured when ${clientInfo.address}:${clientInfo.port} was connecting:`, err);
    });
    socket.on('data', (data) => {
        console.log('data is coming: ', data);
        if (data.toString() === CRLF) {
            console.log('enter triggered.');
            askForPassword();
        }
    });
    socket.on('drain', () => {
        console.log('ondrain');
    });
    socket.on('end', () => {
        console.log('end');
    });
    socket.write('220 Greeting from NODE-FTP! :)\nPlease provide your username:');
    function askForPassword() {
        socket.write('331 Please specify the password.');
    }
}
//# sourceMappingURL=index.js.map