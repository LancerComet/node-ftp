import * as net from 'net'

declare class Client {
  clientInfo: IClientInfo
  private inited: boolean = false
  
  private socket: net.Socket
  getSocket () : net.Socket {}
  
  private clientRawData: string = ''
  private resetClientRawData () : void {}


  private authInput: IAuthInput
  private askForUsername () : void {}
  private askForPassword () : void {}
  async startAuth () : void {}

  private onData (data: Buffer) : void {} 
  
  private onCommandConfirm () : void {}

  sendGreetingInfo () : Promise<Function> {}
  registerEvents () : void {}
}
