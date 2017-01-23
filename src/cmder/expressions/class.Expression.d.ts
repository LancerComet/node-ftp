/// <reference path="../index.d.ts" />


/**
 * Expression of document script.
 * 
 * @class Expression
 */
declare class Expression {
  /**
   * Type always be 'CallExpression'.
   * 
   * @type {string}
   * @memberOf Expression
   */
  type: string

  /**
   * The name of this expression.
   * 
   * @type {string}
   * @example 
   *  "select", "style", "create".
   * @memberOf Expression
   */
  name: string

  /**
   * Arguments of this expression.
   * 
   * @type {(Array<Literal>)} 
   * @memberOf Expression
   */
  arguments: Array<Literal>

  /**
   * Creates an instance of Expression.
   * 
   * @param {string} name
   * 
   * @memberOf Expression
   */
  constructor (name: string)

  /**
   * Insert an new argument into this expression.
   * 
   * @param {Literal} argument
   * 
   * @memberOf Expression
   */
  insertArg (argument: Literal)
}
