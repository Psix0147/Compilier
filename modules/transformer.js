var files = require('./files');

function traverser(ast, visitor) {

  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  var traverseNode = function(node, parent) {

    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {

      case 'Program':
      traverseArray(node.body, node);
        break;


      case 'massive':
      case 'CallExpression':
        //console.log(node);
        files.writeTransformTree(node.type, node.name);
        traverseArray(node.params, node);
        break;

      case 'comparasion':
      case 'Num':
      case 'id':
      case 'math':
      case 'rparen':
      case 'lparen':
      case 'increment':
      case 'and':
      case 'StringLiteral':
      case 'lsqparen':
      case 'rsqparen':
        //console.log(node);
        files.writeTransformTree(node.type, node.value);
        break;
      
      case 'Sub':
        break;
      default:
        throw new TypeError(node.type);
    }
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  traverseNode(ast, null);
}

var transformer = function(ast) {
  let newAst = {
    type: 'Program',
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {
    Num: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    increment: {
      enter(node, parent) {
        parent._context.push({
          type: 'increment',
          value: node.value,
        });
      },
    },

    comparasion: {
    enter(node, parent) {
        parent._context.push({
          type: 'comparision',
          value: node.value,
        });
      },
    },

    id: {
    enter(node, parent) {
        parent._context.push({
          type: 'id',
          value: node.value,
        });
      },
    },

    math: {
    enter(node, parent) {
        parent._context.push({
          type: 'math',
          value: node.value,
        });
      },
    },

    lparen: {
    enter(node, parent) {
        parent._context.push({
          type: 'lparen',
          value: node.value,
        });
      },
    },

    rparen: {
    enter(node, parent) {
        parent._context.push({
          type: 'rparen',
          value: node.value,
        });
      },
    },

    and: {
    enter(node, parent) {
        parent._context.push({
          type: 'and',
          value: node.value,
        });
      },
    },

    sub: {
    enter(node, parent) {
        parent._context.push({
          type: 'sub',
          value: node.value,
        });
      },
    },

    lsqparen: {
    enter(node, parent) {
        parent._context.push({
          type: 'lsqparen',
          value: node.value,
        });
      },
    },

    rsqparen: {
    enter(node, parent) {
        parent._context.push({
          type: 'rsqparen',
          value: node.value,
        });
      },
    },

    CallExpression: {
      enter(node, parent) {

        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;

        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }
        
        parent._context.push(expression);
      },
    },

    massive: {
      enter(node, parent) {
        let expression = {
          type: 'massive',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };
        node._context = expression.arguments;
        
        parent._context.push(expression);
        //console.log(parent.params);
      },
    }
  });

  

  //codeGenerator(newAst);
  //console.log(newAst.body);
  
  return newAst;

}


module.exports.transformer = transformer;
module.exports.traverser = traverser;