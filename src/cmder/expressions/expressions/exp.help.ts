/// <reference path="../../index.d.ts" />

/*
 * Expression: help.
 * By LancerComet at 23:58, 2016.11.26.
 * # Carry Your World #
 */

import { Expression } from '../'
import { StringLiteral } from '../../parser'

import { errorHandler } from '../../utils'

const EXP_NAME = 'help'

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
  // "PASS" must be followed by a password string literal.
  // Password argument.
  if (!tokens.length) {
    return console.warn('[Caution] PASS: No vaild argument is provided.')
  }

  const passwordArg = tokens.shift()

  passExpression.insertArg(
    passwordArg.type === 'word' && new StringLiteral(passwordArg.value)
  )

  ast.insertExpression(passExpression)
  // Done! :)
}
