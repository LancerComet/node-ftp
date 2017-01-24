import { Client } from '../../model'

/**
 * Buildin command: help.
 * Print all available FTP commands for user. 
 * 
 * @export
 * @param {string} userInput - Content sent from client, Always be "help".
 * @returns {boolean}
 */
export default function help (userInput: string, client: Client) : boolean {
  client.write(
    '214-The following commands are recognized.\r\n' +
    ' ABOR ACCT ALLO APPE CDUP CWD  DELE EPRT EPSV FEAT HELP LIST MDTM MKD\r\n' +
    ' MODE NLST NOOP OPTS PASS PASV PORT PWD  QUIT REIN REST RETR RMD  RNFR\r\n' +
    ' RNTO SITE SIZE SMNT STAT STOR STOU STRU SYST TYPE USER XCUP XCWD XMKD\r\n' +
    '214 Help OK.\r\n'
  )
  return true
}
