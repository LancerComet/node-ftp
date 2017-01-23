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
   * Client information.
   * @type {IClientInfo}
   */
  clientInfo: IClientInfo

  /**
   * The raw data that sent by client.
   * 
   * @type {string}
   * @private
   */
  private clientRawData: string = ''

  /**
   * Reset client raw data to empty string.
   * 
   * @return void
   * @private
   */
  private resetClientRawData () {
    this.clientRawData = ''
  }

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

    socket.on('error', err => {
      console.error(`[Error] A new error has occured when ${clientInfo.address}:${clientInfo.port} was connecting:`, err)
    })

    // socket.on('data', this.onData)
    socket.on('data', (data: Buffer) => {
      this.onData(data)  // Avoid context binding, DanTeng!
    })

    socket.on('drain', () => {
      console.log('ondrain')
    })

    socket.on('end', () => {
      console.log('end')
    })
  }

  /**
   * Event that will be triggered when tcp data is received.
   * 
   * @returns void
   * @private
   */
  private onData (data: Buffer) {
    if (data.toString() === DEFINITION.CRLF) {
      this.onCommandConfirm()
    } else {
      this.clientRawData += data
    }
  }

  /**
   * Event that will be triggered when user confirmed the command.
   * 
   * @returns void
   * @private
   */
  private onCommandConfirm () {
    console.log('enter triggered: ', this.clientRawData)
    const directive = this.clientRawData
    
    // Reset client raw data.
    this.resetClientRawData()
  }

  /**
   * Send greeting information to client.
   * 
   * @returns {Promise<Function>}
   */
  sendGrretingInfo () : Promise<Function> {
    return new Promise((resolve, reject) => {
      const resopnse = utils.addBackspace('\r\n220 Greeting from NODE-FTP! :)\r\n')
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

        // Remove this listener.        
        socket.removeListener('data', onData)

        // End of input. Get password and check both username and password.                
        const userInput = data
        this.authInput.password = utils.getPassword(userInput)
        data = ''

        const isAuthSuccess = utils.auth(this.authInput.username, this.authInput.password)

        if (isAuthSuccess) {
          resolve(socket)
        } else {
          const authFailedRes = utils.addBackspace('\r\n530 [Error] Username or password is wrong.\r\n\r\n')
          socket.write(authFailedRes)
          reject()
        }
      }

      let data = ''
      socket.on('data', onData)
    })
  }

  /**
   * Start authorization function.
   * For login authorization.
   */
  async startAuth () {
    try {
      await this.askForUsername()
      await this.askForPassword()
    } catch (tryErr) {
      // Username or password is wrong. Try again.
      await this.startAuth()
    }
    console.log(`[Info] New client from ${this.clientInfo.address}:${this.clientInfo.port} is connected successfully.`)
    return true
  }

  constructor (socket: net.Socket) {
    this.socket = socket
    this.clientInfo = {
      address: socket.remoteAddress,
      port: socket.remotePort
    }
  }
}
