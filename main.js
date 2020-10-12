var files = require('./modules/files');
var lexer = require('./modules/lexer');
var parser = require('./modules/parser');
var transformer = require('./modules/transformer');
var codegen = require('./modules/codegen');
var fs = require('fs')


var compilier = function(data) {
	var tokens = lexer.lexer(data);
	var AST = parser.parser(tokens);
	var transform = transformer.transformer(AST);
	var output = codegen.codegen(transform);
}



var startPoint = function(inputFile){ 
  var input = fs.readFile(inputFile, 'utf8', function (err, data){
    if (err) {
      console.error(err)
      return
    }
   compilier(data);
  });
}


files.clearFile();
startPoint("input.js");