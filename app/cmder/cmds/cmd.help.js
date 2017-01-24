"use strict";
function help(userInput, client) {
    client.write('214-The following commands are recognized.\r\n' +
        ' ABOR ACCT ALLO APPE CDUP CWD  DELE EPRT EPSV FEAT HELP LIST MDTM MKD\r\n' +
        ' MODE NLST NOOP OPTS PASS PASV PORT PWD  QUIT REIN REST RETR RMD  RNFR\r\n' +
        ' RNTO SITE SIZE SMNT STAT STOR STOU STRU SYST TYPE USER XCUP XCWD XMKD\r\n' +
        '214 Help OK.\r\n');
    return true;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = help;
