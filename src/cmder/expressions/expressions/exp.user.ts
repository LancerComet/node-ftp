/// <reference path="../../index.d.ts" />

/*
 * Expression: user.
 * By LancerComet at 23:58, 2016.11.26.
 * # Carry Your World #
 */

import { Expression } from '../'
import { StringLiteral } from '../../parser'

import { errorHandler } from '../../utils'

const EXP_NAME = 'USER'

/**
 * createExpression: user.
 * This function will be called in parser. 
 * 
 * @example
 *  user myDiv to body
 * 
 * @export
 * @param {Token} currentToken
 * @param {Array<Token>} tokens
 * @param {AST} ast
 */
export function createExpression (currentToken: Token, tokens: Array<Token>, ast: AST) {
  const userExpression = new Expression(EXP_NAME)

  // Let's deal with the first arg.
  // "USER" must be followed by a username string literal.
  // Username argument.
  if (!tokens.length) {
    return console.warn('[Caution] USER: No vaild argument is provided.')
  }
  
  const usernameArg = tokens.shift()

  userExpression.insertArg(
    usernameArg.type === 'word' && new StringLiteral(usernameArg.value)
  )

  ast.insertExpression(userExpression)
  // Done! :)
}
