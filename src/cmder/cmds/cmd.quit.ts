import { Client } from '../../model'

/**
 * Buildin command: quit.
 * Drop connection gracefully.
 * 
 * @export
 * @param {string} userInput - Content sent from client, Always be "quit".
 * @returns {boolean}
 */
export default function help (userInput: string, client: Client) : boolean {
  const socket = client.getSocket()
  socket.write(
    '214-The following commands are recognized.\r\n' +
    ' ABOR ACCT ALLO APPE CDUP CWD  DELE EPRT EPSV FEAT HELP LIST MDTM MKD\r\n' +
    ' MODE NLST NOOP OPTS PASS PASV PORT PWD  QUIT REIN REST RETR RMD  RNFR\r\n' +
    ' RNTO SITE SIZE SMNT STAT STOR STOU STRU SYST TYPE USER XCUP XCWD XMKD\r\n' +
    '214 Help OK.\r\n'
  )
  socket.end('')
  return true
}
