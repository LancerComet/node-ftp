/// <reference path="../../index.d.ts" />

/*
 * Expression: pass.
 * By LancerComet at 23:58, 2016.11.26.
 * # Carry Your World #
 */

import { Expression, EXPRESSION_LIST, Variable } from '../'
import { NumberLiteral, StringLiteral } from '../../parser'

import { errorHandler } from '../../utils'

const EXP_NAME = 'PASS'

/**
 * createExpression: pass.
 * This function will be called in parser. 
 * 
 * @example
 *  pass myDiv to body
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 * @param {AST} ast
 */
export function createExpression (currentToken: Token, tokens: Array<Token>, ast: AST) {
  const passExpression = new Expression(EXP_NAME)

  // Let's deal with the first arg.
  // "USER" must be followed by a password string literal.
  // Username argument.
  const passwordArg = tokens.shift()

  passExpression.insertArg(
    passwordArg.type === 'word'
    ? new StringLiteral(passwordArg.value)
    : new NumberLiteral(passwordArg.value)
  )

  ast.insertExpression(passExpression)
  // Done! :)
}
