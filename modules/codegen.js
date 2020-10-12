var files = require('./files');


var codeGenerator = function(node) {

    switch (node.type) {

    case 'Program':
      files.writeASM("\t.text\n");
	    files.writeASM("\t.global main\n");
      files.writeASM("\t.type main, @function \n\n");
	    files.writeASM("main:\n");
      return node.body.map(codeGenerator)
        .join('\n');
  
    case 'ExpressionStatement':
      //console.log(node.expression);
      return (
        codeGenerator(node.expression)
      );
    
    case 'CallExpression':

      //if (node.callee.name == "")
      //console.log(node.arguments);
      return (
        codeGenerator(node.callee) +
        node.arguments.map(codeGenerator)
      );
    
    case 'lsqparen':
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));


    case 'rsqparen':
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));

    case 'StringLiteral':
      
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));

    case 'NumberLiteral':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));

    case 'Identifier': 
      //console.log(node.name);
      return (files.writeASM(".ascii "+ '"' + node.name + '"'));


    case 'id':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));

    case 'lparen':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));

    case 'rparen':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));

    case 'comparision':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));

    case 'massive':    
      //console.log(node.name);
      return (
        codeGenerator(node.callee) +
        node.arguments.map(codeGenerator)
      );

    case 'math':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));
    
    case 'increment':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));
    
    case 'and':    
      //console.log(node.value);
      return (files.writeASM(".ascii "+ '"' + node.value + '"'));
    
    
    

    default:
     throw new TypeError(node.type);
  }
}


module.exports.codegen = codeGenerator;