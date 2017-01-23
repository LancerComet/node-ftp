/// <reference path="../node_modules/@types/node/index.d.ts" />

/**
 * Client Information.
 * 
 * @interface IClientInfo
 */
declare interface IClientInfo {
  address: string,
  port: number
}


declare interface IAppConfig {
  username: string,
  password: string,
  hostname: string,
  port_proto: number,
  port_data: number
}