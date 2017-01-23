/**
 * Token.
 * 
 * @class Token
 */
declare class Token {
  type: string
  value: any
}

/**
 * WordToken.
 * 
 * @class WordToken
 * @extends {Token}
 */
declare class WordToken extends Token {
  type: string
  
  /**
   * Creates an instance of WordToken.
   * 
   * @param {string} value
   * 
   * @memberOf WordToken
   */
  constructor (value: string)  
}
