/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference path="./cmder/index.d.ts" />
/// <reference path="./model/index.d.ts" />


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
 * Application configuration object.
 * 
 * @interface IAppConfig
 */
declare interface IAppConfig {
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
