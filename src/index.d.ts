/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference path="./client/index.d.ts" />

/**
 * Client Information.
 * 
 * @interface IClientInfo
 */
declare interface IClientInfo {
  address: string,
  port: number
}

/**
 * Account definition.
 * 
 * @interface IAccountDefine
 */
declare interface IAccountDefine {
  username: string
  password: string
  root: string
}

/**
 * Application configuration object.
 * 
 * @interface IAppConfig
 */
declare interface IAppConfig {
  users:IAccountDefine[]
  username: string,
  password: string,
  hostname: string,
  port_proto: number,
  port_data: number
}

/**
 * User input for login authorization.
 * 
 * @interface IAuthInput
 */
declare interface IAuthInput {
  username: string
  password: string
}
