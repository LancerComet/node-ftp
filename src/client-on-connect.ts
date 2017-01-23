const appConfig: IAppConfig = require('../config.json')

import * as net from 'net'
import * as DEFINITION from './def'
import * as utils from './utils'

/**
 * Client Object.
 * A new client would be an instance of Client.
 * 
 * @class Client
 */
class Client {
  /**
   * The socket object of this client.
   * @type {net.Socket}
   */ 
  socket: net.Socket

  /**
   * Status of this client.
   * This would be some ftp status code.
   */
  status: number = 0

  /**
   * Client information.
   * @type {IClientInfo}
   */
  clientInfo: IClientInfo

  /**
   * Register events to incoming socket.
   * 
   * @param {net.Socket} socket
   * @param {IClientInfo} clientInfo
   * @returns void
   */
  registerEvents () : void {
    const socket = this.socket
    const clientInfo = this.clientInfo

    socket.on('connect', () => {
      console.log('new client is connected.')
    })

    socket.on('error', err => {
      console.error(`[Error] A new error has occured when ${clientInfo.address}:${clientInfo.port} was connecting:`, err)
    })

    socket.on('data', (data: Buffer) => {
      console.log('data is coming: ', data)
      if (data.toString() === DEFINITION.CRLF) {
        console.log('enter triggered.')
      }
    })

    socket.on('drain', () => {
      console.log('ondrain')
    })

    socket.on('end', () => {
      console.log('end')
    })
  }

  /**
   * Send greeting information to client.
   * 
   * @returns {Promise<Function>}
   */
  sendGrretingInfo () : Promise<Function> {
    return new Promise((resolve, reject) => {
      const resopnse = utils.addBackspace('220 Greeting from NODE-FTP! :)\n')
      this.socket.write(resopnse)
      resolve(this.socket)
    })
  }

  /**
   * Tell client that an username is required.
   * 
   * @param {net.Socket} socket
   * @returns {Promise<Function>} 
   */
  askForUsername () : Promise<Function> {
    const socket = this.socket
    return new Promise((resolve, reject) => {
      if (!appConfig.username) return resolve(socket)
      const response = utils.addBackspace('220 Please provide your username.\r\n')
      socket.write(response)
      resolve(socket)
    })
  }

  /**
   * Tell client that a password is required.
   * 
   * @param {net.Socket} socket
   * @returns {Promise<Function>}
   */
  askForPassword () : Promise<Function> {
    const socket = this.socket
    return new Promise((resolve, reject) => {
      if (!appConfig.username) return resolve(socket)
      const response = utils.addBackspace('331 Please provide your password.\r\n')
      socket.write(response)
      resolve(socket)
    })
  }

  constructor (socket: net.Socket) {
    this.socket = socket
    this.clientInfo = {
      address: socket.remoteAddress,
      port: socket.remotePort
    }
    this.registerEvents()
  }
}

/**
 * This function will be triggered when a new client is try to connect.
 * 
 * @export
 * @param {net.Socket} socket
 */
export default async function clientOnConnect (socket: net.Socket) {
  const client = new Client(socket)
  await client.sendGrretingInfo()
  await client.askForUsername()
  await client.askForPassword()
}