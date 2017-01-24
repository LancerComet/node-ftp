import * as net from 'net'

import * as DEFINITION from '../def'
import * as utils from '../utils'

import { cmder } from '../cmder'

const appConfig: IAppConfig = require('../../config.json')

/**
 * Client Object.
 * A new client would be an instance of Client.
 * 
 * @class Client
 */
export default class Client {
  static readonly MAX_RETRYING_TIME = 3

  /** Whether this client object is initialized. */
  private inited: boolean = false

  /**
   * Retrying times.
   * Will be increase (+1 per time) when error retrying occured.
   */
  private _retrying: number = 0
  
  private get retrying () {
    return this._retrying
  }

  private set retrying (newVal) {
    if (this._retrying <= Client.MAX_RETRYING_TIME) {
      this._retrying = newVal     
    } else {
      this.disconnect('500 Error.')
    }
  }

  /**
   * Assign retrying error.
   * 
   * @return void
   */
  private assignRetryingError () {
    this.retrying++
  }

  /**
   * Client information.
   * @type {IClientInfo}
   * @private
   */
  private clientInfo: IClientInfo
  
  /**
   * Return client information.
   * 
   * @returns {IClientInfo}
   */
  getClientInfo () {
    return this.clientInfo
  }

  /**
   * The socket object of this client.
   * @type {net.Socket}
   */ 
  private socket: net.Socket

  /**
   * Get socket from extenral.
   * @returns { net.Socket }
   */
  getSocket () {
    return this.socket
  }

  /**
   * Write message to client.
   * 
   * @param {string} content
   * @return void
   */
  write (content: string) {
    this.socket.write(utils.addBackspace(content))
  }

  /**
   * End connection.
   * 
   * @param {string} [content]
   * @return void
   */
  disconnect (content?: string) {
    this.write(content || '')
    this.socket.destroy()
  }

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
  private authInput: IAuthInput = {
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
    if (this.inited) { return }

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

    this.inited = true
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
    const userCmd = this.clientRawData
    if (process.env.NODE_ENV === 'development') {
      console.log('Command send: ', userCmd)
    }
    cmder(userCmd, this)
    this.resetClientRawData()
  }

  /**
   * Send greeting information to client.
   * 
   * @returns {Promise<Function>}
   */
  sendGreetingInfo () : Promise<Function> {
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
  private askForUsername () : Promise<Function> {
    const socket = this.socket

    return new Promise((resolve, reject) => {
      if (!appConfig.username) return resolve(socket)

      const response = utils.addBackspace('332 Please provide your username:\r\n')
      socket.write(response)

      const onData = (chunks: Buffer) => {
        if (chunks.toString() !== DEFINITION.CRLF) {
          this.clientRawData += chunks
          return
        }

        // End of input. Get username.
        const userCmd = this.clientRawData
        this.authInput.username = cmder(userCmd)
        this.resetClientRawData()

        // Remove this listener.
        socket.removeListener('data', onData)
        resolve(socket)
      }

      socket.on('data', onData)
    })
  }

  /**
   * Tell client that a password is required.
   * 
   * @param {net.Socket} socket
   * @returns {Promise<Function>}
   */
  private askForPassword () : Promise<Function> {
    const socket = this.socket
    return new Promise((resolve, reject) => {
      if (!appConfig.username) return resolve(socket)

      const response = utils.addBackspace('331 Please provide your password:\r\n')      
      socket.write(response)

      const onData =  (chunks: Buffer) => {
        if (chunks.toString() !== DEFINITION.CRLF) {
          this.clientRawData += chunks
          return
        }

        // Remove this listener.        
        socket.removeListener('data', onData)

        // End of input. Get password and check both username and password.                
        const userInput = this.clientRawData
        this.authInput.password = cmder(userInput)
        this.resetClientRawData()

        const isAuthSuccess = utils.auth(this.authInput.username, this.authInput.password)

        if (isAuthSuccess) {
          resolve(socket)
        } else {
          const authFailedRes = utils.addBackspace('530 Username or password is wrong.\r\n\r\n')
          socket.write(authFailedRes)
          this.assignRetryingError()
          reject()
        }
      }

      socket.on('data', onData)
    })
  }

  /**
   * Start authorization function.
   * For login authorization.
   * @async
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
