var files = require('./files');

var lexer = function(input) {
  
  let current = 0;
  let tokens = [];

  let WHITESPACE = /\s/;
  let NUMBERS = /[0-9]/;
  let LETTERS = /[a-z]/i;

  let char, char1, char2;
  let string = 0;

  while (current < input.length) {

       
    char =  input[current];
    char1 =  input[current+1];
    char2 =  input[current+2];


    if (char == '\n'){
      string++;
    }


    if ( char ===  '.' ) {
      tokens.push({
        type: 'dot',
        value: '.',
        string: string,
      });
      current++;
      continue;
    }
    if ( char ===  '>' ) {
      tokens.push({
        type: 'comparison',
        value: '>',
        string: string,
      });
      current++;
      continue;
    }
    if ( char ===  '<' ) {
      tokens.push({
        type: 'comparison',
        value: '<',
        string: string,
      });
      current++;
      continue;
    }
    if ( char ===  '(' ) {
      tokens.push({
        type: 'lparen',
        value: '(',
        string: string,
      });
      current++;
      continue;
    }
    if (char === ')') {
      tokens.push({
        type: 'rparen',
        value: ')',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '{') {
      tokens.push({
        type: 'lbrace',
        value: '{',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '}') {
      tokens.push({
        type: 'rbrace',
        value: '}',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '[') {
      tokens.push({
        type: 'lsqparen',
        value: '[',
        string: string,
      });
      current++;
      continue;
    }
    if (char === ']') {
      tokens.push({
        type: 'rsqparen',
        value: ']',
        string: string,
      });
      current++;
      continue;
    }
    if (char === ',') {
      tokens.push({
        type: 'coma',
        value: ',',
        string: string,
      });
      current++;
      continue;
    }
    if (char === ';') {
      tokens.push({
        type: 'semi',
        value: ';',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '+' && char1 === '+') {
      tokens.push({
        type: 'increment',
        value: '++',
        string: string,
      });
      current++;
      current++;
      continue;
    }
    if (char === '=' && char1 === '=') {
      tokens.push({
        type: 'comparison',
        value: '==',
        string: string,
      });
      current++;
      current++;
      continue;
    }
    if (char === '=') {
      tokens.push({
        type: 'assignment',
        value: '=',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '+') {
      tokens.push({
        type: 'math',
        value: '+',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '-') {
      tokens.push({
        type: 'math',
        value: '-',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '*') {
      tokens.push({
        type: 'math',
        value: '*',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '/') {
      tokens.push({
        type: 'math',
        value: '/',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '%') {
      tokens.push({
        type: 'math',
        value: '%',
        string: string,
      });
      current++;
      continue;
    }
    if (char === '&' && char1 === '&') {
      tokens.push({
        type: 'and',
        value: '&&',
        string: string,
      });
      current++;
      current++;
      continue;
    }
    if (char === '"') {
      let value = '';
      char = input[++current];
      while (char !== '"') {
        if (char == "\n"){
          console.error("Error 1: string literal doesn't close");
          current++;
          continue;
        }
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: 'string', value });
      continue;
    }

    if (char+char1 == "if"){
      tokens.push({
        type: 'KeyWordIf',
        value: 'if',
        string: string,
      });
      current=current+2;
      continue;
    }
    if (char+char1+char2 == "var"){
      tokens.push({
        type: 'KeyWordVar',
        value: 'var',
        string: string,
      });
      current=current+3;
      continue;
    }

    if (char+char1+char2 == "let"){
      tokens.push({
        type: 'KeyWordLet',
        value: 'var',
        string: string,
      });
      current=current+3;
      continue;
    }

    if (char+char1+char2+input[current+3]+input[current+4] == "while"){
      tokens.push({
        type: 'KeyWordWhile',
        value: 'While',
        string: string,
      });
      current=current+5;
      continue;
    }

    if (char+char1+char2+input[current+3]+input[current+4]+input[current+5]+input[current+6]+input[current+7] == "function") {
      tokens.push({
        type: 'function',
        value: 'function',
        string: string,
      });
      current=current+8;
      continue;
    }
  
    
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
    tokens.push({ type: 'number', value });
    continue
    }

    
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });
      continue;
    }

    throw new TypeError('I dont know what this character is: ' + char);
  }
  //console.log(tokens);
  //parser(tokens);

  /*for (i in tokens){
    console.log("type: " + tokens[i].type + " value: " + tokens[i].value);
  }*/

  return tokens;
}

module.exports.lexer = lexer;