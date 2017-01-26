import * as net from 'net'
import * as DEFINITION from '../def'
import { commander } from '../cmder'
import { auth } from '../utils'

const appConfig: IAppConfig = require('../../config.json')

/**
 * Client Object.
 * A new client would be an instance of Client.
 * 
 * @class Client
 */
export default class Client {
  /** Chances for retrying. */
  static readonly MAX_RETRYING_TIME = 3

  /** Whether this client object is initialized. */
  private inited: boolean = false

  /** Whether client is logged-in. */
  private isLogin: boolean = false

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
   * @return {void}
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
   * The raw data that sent by client.
   * 
   * @type {string}
   * @private
   */
  private clientRawData: string = ''

  /**
   * Reset client raw data to empty string.
   * 
   * @return {void}
   * @private
   */
  private resetClientRawData () {
    this.clientRawData = ''
  }

  /**
   * Write message to client.
   * 
   * @param {string} content
   * @return {void}
   */
  write (content: string) {
    this.socket.write(
      new Buffer(
        (new RegExp(`.+${DEFINITION.CRLF}$`).test(content) ? content : content += DEFINITION.CRLF)
      )
    )
  }

  /**
   * Send 500 to client.
   * 
   * @return {void}
   */
  errorCmd () {
    this.write('500 Error.')
  }

  /**
   * End connection.
   * 
   * @param {string} [content='200 Bye.']
   * @return {void}
   */
  disconnect (content: string = '200 Bye.') {
    this.write(content)
    this.socket.destroy()
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
   * Register login username.
   */
  setLoginUsername (username: string) {
    this.authInput.username = username
  }

  /**
   * Register login password.
   */
  setLoginPassword (password: string) {
    this.authInput.password = password
  }

  /**
   * Register events to incoming socket.
   * 
   * @param {net.Socket} socket
   * @param {IClientInfo} clientInfo
   * @return {void}
   */
  registerEvents () : void {
    if (this.inited) { return }

    const socket = this.socket
    const clientInfo = this.clientInfo

    socket.on('error', this.onError)

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
   * @return {void}
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
   * Connection Error Handler.
   * 
   * @param {Error} error
   */
  private onError (error: Error) {
    console.error(`[Error] An error is occured: `, error)
  }

  /**
   * Event that will be triggered when user confirms a command.
   * 
   * @return {void}
   * @private
   */
  private onCommandConfirm () {
    const client = this
    const userCmd = this.clientRawData
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Command send: ', userCmd)
    }

    // Login status or commands that can be executed without authorization.
    if (this.isLogin || /^(USER|PASS|HELP|QUIT|EXIT)/i.test(userCmd)) {
      commander(userCmd, client)
    }

    this.resetClientRawData()
  }

  /**
   * Login authorization.
   * 
   * @return {void}
   */
  loginAuth () {
    const userInputUsername = this.authInput.username
    const userInputPassword = this.authInput.password

    const definedPassword = auth.getPassword(userInputUsername)

    // "definedPassword = false" means no such user.
    console.log('username: ', userInputUsername)
    console.log('definedPassword: ', definedPassword)
    console.log('password entered: ', userInputPassword)
    if (definedPassword === false || userInputPassword !== definedPassword) {
      this.write('530 Login incorrect, username or password is wrong.')
    } else {
      this.loginSuccessfully()
    }
  }

  /**
   * Event will be triggered when user is logged in.
   * 
   * @return {void}
   */
  private loginSuccessfully () {
    console.log(`[Info] New client from ${this.clientInfo.address}:${this.clientInfo.port} is connected successfully.`)
    
    this.isLogin = true

    this.write(`230---- Welcome back, ${this.authInput.username}! ----`)
    this.write(`230-Feel free to use commands to control files.`)
    this.write(`230 Login Successful.`)
  }

  /**
   * Send greeting information to client.
   * 
   * @returns {Promise<Function>}
   */
  sendGreetingInfo () : Promise<Function> {
    return new Promise((resolve, reject) => {
      this.write('220 Greeting from NODE-FTP! :)')
      resolve(this.socket)
    })
  }

  /**
   * Tell client that a username is required.
   */
  askForUsername () {
    // this.write('332 Please provide your username.')
  }

  /**
   * Tell client that a password is required.
   */
  askForPassword () {
    this.write('331 Please provide your password.')
  }

  /** Setup this conenction and socket. */
  private setup () {
    this.clientInfo = {
      address: this.socket.remoteAddress,
      port: this.socket.remotePort
    }
    this.socket.setKeepAlive(true)    
  }

  constructor (socket: net.Socket) {
    this.socket = socket
    this.setup()
    this.registerEvents()
  }
}
