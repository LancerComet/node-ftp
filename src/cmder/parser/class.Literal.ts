/**
 * Literal.
 * 
 * @export
 * @class Literal
 */
export class Literal {
  /**
   * Type of this literal object.
   * 
   * @type {string}
   * @memberOf Literal
   */
  type: string

  /**
   * Value of this literal object. 
   * 
   * @type {(number | string)}
   * @memberOf Literal
   */
  value: number | string

  /**
   * Creates an instance of Literal.
   * 
   * @param {string} type
   * @param {(number | string)} value
   * 
   * @memberOf Literal
   */
  constructor (type: string, value: number | string) {
    this.type = type
    this.value = value
  }
}

/**
 * StringLiteral.
 * The literal that is string-typed.
 * 
 * @export
 * @class StringLiteral
 * @extends {Literal}
 */
export class StringLiteral extends Literal {
  /**
   * Creates an instance of StringLiteral.
   * 
   * @param {string} value
   * 
   * @memberOf StringLiteral
   */
  constructor (value: string) {
    super('StringLiteral', value)
  }
}

/**
 * ExpressionLiteral.
 * This is a expression that is stored as the literal. 
 * 
 * @export
 * @class ExpressionLiteral
 * @extends {Literal}
 */
export class ExpressionLiteral extends Literal {
  
  /**
   * Creates an instance of ExpressionLiteral.
   * 
   * @param {string} value
   * 
   * @memberOf ExpressionLiteral
   */
  constructor (value: string) {
    super('expression', value)
  }
}