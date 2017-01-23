import * as net from 'net'

import * as DEFINITION from '../def'
import * as utils from '../utils'

const appConfig: IAppConfig = require('../../config.json')

/**
 * Client Object.
 * A new client would be an instance of Client.
 * 
 * @class Client
 */
export default class Client {
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
   * User input for login authorization.
   * 
   * @type {IAuthInput}
   * @memberOf Client
   */
  authInput: IAuthInput = {
    username: '',
    password: ''
  }

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
      const resopnse = utils.addBackspace('220 Greeting from NODE-FTP! :)\r\n\r\n')
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

      const response = utils.addBackspace('332 Please provide your username:\r\n')
      socket.write(response)

      const onData = (chunks: Buffer) => {
        if (chunks.toString() !== DEFINITION.CRLF) {
          data += chunks
          return
        }

        // End of input. Get username.
        const userInput = data
        this.authInput.username = utils.getUsername(userInput)
        data = ''

        // Remove this listener.
        socket.removeListener('data', onData)
        resolve(socket)
      }

      let data = ''
      socket.on('data', onData)
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

      const response = utils.addBackspace('331 Please provide your password:\r\n')      
      socket.write(response)

      const onData =  (chunks: Buffer) => {
        if (chunks.toString() !== DEFINITION.CRLF) {
          data += chunks
          return
        }

        // End of input. Get password and check both username and password.
        const userInput = data
        this.authInput.password = utils.getPassword(userInput)
        data = ''

        const isAuthSuccess = utils.auth(this.authInput.username, this.authInput.password)
        if (isAuthSuccess) {
          // Remove this listener.
          resolve(socket)
        } else {
          const authFailedRes = utils.addBackspace('425 Username or password is wrong.\r\n\r\n')
          socket.write(authFailedRes);
          this.startAuth()
        }
        
        socket.removeListener('data', onData)        
      }

      let data = ''
      socket.on('data', onData)
    })
  }

  async startAuth () {
    await this.askForUsername()
    await this.askForPassword()
    console.log(`[Info] New client from ${this.clientInfo.address}:${this.clientInfo.port} is connected successfully.`)
  }

  constructor (socket: net.Socket) {
    this.socket = socket
    this.clientInfo = {
      address: socket.remoteAddress,
      port: socket.remotePort
    }
    // this.registerEvents()
  }
}