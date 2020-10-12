let symbols = [];
var files = require('./files');

var parser = function(tokens) {

  let nestlvl = 0;
  let current = 0;
  var parent = [];
  parent.push("programm");
  //
  function walk() {

      

    let token = tokens[current];
    let token1 = tokens[current+1];
    

     

    if (token.type === 'string') {
      current++;

      files.writeASTTree(nestlvl, 'StringLiteral', token.value);

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if (token.type === 'semi') {
      current++;
      files.writeASTTree(nestlvl, 'Sub', token.value);
      return {
        type: 'Sub',
        value: token.value,
      };
    }

    if (token.type === 'number') {
      current++;
      files.writeASTTree(nestlvl, 'Num', token.value);
      return {
        type: 'Num',
        value: token.value,
      };
    }
    
    

    if (token.type === 'name' && token1.type === 'assignment') {

      
        let node = {
          type: 'CallExpression',
          name: token1.value,
          params: [],
        };
      
      node.params.push({
        type: 'id',
        value: token.value,
      });

      files.writeASTTree(nestlvl, 'id', token.value);
      files.writeASTTree(nestlvl, 'CallExpression', token1.value);

      current=current+2;
      token = tokens[current];

      if (token.type != 'semi'){
        node.params.push(walk());
      }
      //console.log(node);
      current++;
      return node;
    }

    if (token.type === 'name' && token1.type === 'lsqparen') {
      
      let node = {
        type: 'massive',
        name: token.value,
        params: [],
      };
      
     
      
      

      node.params.push({
        type: 'lsqparen',
        value: token1.value,
      });
      
      files.writeASTTree(nestlvl, 'massive', token.value);
      files.writeASTTree(nestlvl, 'lsqparen', token1.value);

      current=current+2;
      var nest = nestlvl;
      nestlvl++;
      token = tokens[current];
            
      while (nestlvl > nest){
        node.params.push(walk());
        token = tokens[current];
      }
      //console.log(node.params);
      //console.log(node);
      //current++;
      return node;
    }


    if ((token.type === 'name' || token.type === 'number')
       && token1.type === 'math') {

      let node = {
          type: 'CallExpression',
          name: token1.value,
          params: [],
        };
      
      files.writeASTTree(nestlvl, 'math', token1.value);
      
      if (token.type === 'name'){
        node.params.push({
          type: 'id',
          value: token.value,
        });
        files.writeASTTree(nestlvl, 'id', token.value);
      }

      if (token.type === 'number'){
        node.params.push({
          type: 'Num',
          value: token.value,
        });
        files.writeASTTree(nestlvl, 'Num', token.value);
      }
      
      
      current=current + 2;
      token = tokens[current];
      while (token.type != 'semi' && token.type != 'rsqparen'){
        node.params.push(walk());
        token = tokens[current];
      }
      //console.log(node);
      //current++;
      return node;
    }



    if (token.type === 'function') {

      token = tokens[++current];

      let node = {
          type: 'CallExpression',
          //name: token.value + "()",
          name: "function",
          params: [],
        };
      
      files.writeASTTree(nestlvl, 'function', token.value + "()");

      parent.push("function");

      current=current+3;
      token = tokens[current];
      var nest = nestlvl;
      nestlvl++;
      while (nestlvl > nest){
        node.params.push(walk());
        token = tokens[current];
      }

      //files.writeASTTree(node.params);
      //console.log(node)
      return node;
      
    }

    if (token.type === 'KeyWordWhile') {


      let node = {
          type: 'CallExpression',
          name: token.value,
          params: [],
        };

      files.writeASTTree(nestlvl, 'CallExpression', token.value);
      
      parent.push("while");

      token = tokens[++current];
      var nest = nestlvl;
      nestlvl++;
      while (nestlvl > nest){
        node.params.push(walk());
        token = tokens[current];
      }
      //nestlvl--;
      //console.log(node.params);
      return node; 
    }

    if (token.type === 'KeyWordIf') {
      //token = tokens[++current];

      let node = {
          type: 'CallExpression',
          name: token.value,
          params: [],
        };

      files.writeASTTree(nestlvl, 'CallExpression', token.value);

      parent.push("if");


      var nest = nestlvl;
      nestlvl++;
      token = tokens[++current];
      while (nestlvl > nest){
        node.params.push(walk());
        token = tokens[current];
      }
      
      
      //nestlvl--;
      //files.writeASTTree(node.params);
      //console.log(node.params);
      return node; 
    }

    if (token.type === 'name') {
      current++;

      return {
        type: 'id',
        value: token.value,
      };
      
    }
    if (token.type === 'KeyWordVar') {

      
      token = tokens[++current];
      symbols.push({
        parent: parent[nestlvl],
        lvl: nestlvl, 
        id: token.value,
      });
      current++;

      files.writeASTTree(nestlvl, 'id', token.value);
      
      return {
        type: 'id',
        value: token.value,
      };
    
      //current++;
    }
    

    if (token.type === 'increment') {
      current++;

      files.writeASTTree(nestlvl, 'increment', token.value);
     
      return {
        type: 'increment',
        value: token.value,
      };
      
    }

    

    if (token.type === 'math') {
      current++;

      files.writeASTTree(nestlvl, 'math', token.value);

      return {
        type: 'math',
        value: token.value,
      };
      
    }

    if (token.type === 'comparison') {
      current++;
      files.writeASTTree(nestlvl, 'comparasion', token.value);
      return {
        type: 'comparasion',
        value: token.value,
      };
      
    }

    
    if (token.type === 'coma') {
      current++;
      files.writeASTTree(nestlvl, 'Sub', token.value);
      return {
        type: 'Sub',
        value: token.value,
      };
      
    }
    
    if (token.type === 'rsqparen') {

      
      
      current++;
      files.writeASTTree(nestlvl, 'rsqparen', token.value);
      nestlvl--;
      return {
        type: 'rsqparen',
        value: token.value,
      };
      
    }

    if (token.type === 'lsqparen') {


      let node = {
          type: 'massive',
          name: token.value,
          params: [],
      };
      
      nestlvl++;
      current++;
      //nestlvl--;
      files.writeASTTree(nestlvl, 'massive', token.value);


      while (token.type != "rsqparen"){
        token = tokens[current];
        node.params.push(walk());
      }

      console.log(node);
      return node;
      
    }
    
    /*if (token.type === 'lsqparen') {
      current++;
      let node = {
          type: 'lsquaren',
          name: "",
          params: [],
        };

      files.writeASTTree(nestlvl, 'lsqparen', token.value);
      
      node.params.push({
          type: 'lsquaren',
          value: token.value,
      });

      var nest = nestlvl;
      nestlvl++;

      token = tokens[++current];
      while (nestlvl > nest){
        node.params.push(walk());
        token = tokens[current];
      }

      return node;
    }*/

    if (token.type === 'lparen') {
      //token = tokens[++current];

      files.writeASTTree(nestlvl, 'lparen', token.value);
      
      let node = {
          type: 'CallExpression',
          name: 'Expression',
          params: [],
        };
      
      node.params.push({
          type: 'lparen',
          value: token.value,
      });

      token = tokens[++current];
      var nest = nestlvl;
      nestlvl++;
      while (nestlvl > nest){
        node.params.push(walk());
        token = tokens[current];
      }
      return node;
      
    }

    if (token.type === 'rparen') {
      current++;  
      files.writeASTTree(nestlvl, 'rparen', token.value); 
      nestlvl--;  
      return {
        type: 'rparen',
        value: token.value,
      };
    }

    if (token.type === 'dot') {
      
      files.writeASTTree(nestlvl, 'Sub', token.value);
      current++;    
      return {
        type: 'Sub',
        value: token.value,
      };
    }

    if (token.type === 'and') {
      
      files.writeASTTree(nestlvl, 'and', token.value);
      current++;    
      return {
        type: 'and',
        value: token.value,
      };
    }

    if (token.type === 'lbrace') {

      files.writeASTTree(nestlvl, 'lbrace', token.value);
      current++;
      return {
        type: 'Sub',
        value: token.value,
      };
    }

    if (token.type === 'rbrace') {
      
      files.writeASTTree(nestlvl, 'rbrace', token.value);
      current++;
      nestlvl--;
      //parent.pop()
      return {
        type: 'Sub',
        value: token.value,
      };
    }

    
    
    //console.log(parent.lenght);
    throw new TypeError(token.type);
  }

  

  let ast = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }
  console.log(symbols);
 // console.log(ast);
  //files.writeASTTree(ast.body);

  //codegen(ast);
  //transformer(ast);
  return ast; 
  
}

module.exports.parser = parser;