import * as cmder from '../cmder'

/**
 * Get username from user input.
 * 
 * @export
 * @param {string} str
 * @returns {string}
 */
export function getUsername (userInput: string) : string {
  const tokens = cmder.tokenizer(userInput)
  const ast = <AST> cmder.parser(tokens)

  try {
    const userExp = ast.body[0]
    return userExp.name === 'USER'
      ? userExp.arguments[0].value.toString()
      : ''
  } catch (tryErr) {
    return ''
  }

  // Another simple and fast way.
  // return commonFunc('USER', userInput)    
}

/**
 * Get password from user input.
 * 
 * @export
 * @param {string} str
 * @returns {string}
 */
export function getPassword (userInput: string) : string {
  const tokens = cmder.tokenizer(userInput)
  const ast = <AST> cmder.parser(tokens)

  try {
    const userExp = ast.body[0]
    return userExp.name === 'PASS'
      ? userExp.arguments[0].value.toString()
      : ''
  } catch (tryErr) {
    return ''
  }

  // Another simple and fast way.  
  // return commonFunc('PASS', userInput)
}

/**
 * Common logic.
 */
function commonFunc (condition: string, str: string) : string {
  // str: USER xxxx or something else.
  const match = str.match(new RegExp(`^${condition}.+`))
  if (!match) return ''
  
  const result = match[0].replace(`${condition} `, '')
  return result
}