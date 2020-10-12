var fs = require('fs')

/*console.log("To start please write start(input file name); \n example: start('input.js')");

function start (inpt){
fs.readFile(inpt, 'utf8', function (err, data){
  if (err) {
    console.error(err)
    return
  }
  lexer(data);
  })
}
*/


var clearFile = function(){

  fs.writeFileSync('./output/AST.txt', "", 'utf8', (err) => {
    if(err) throw err;

  });
  fs.writeFileSync('./output/output.s', "", 'utf8', (err) => {
    if(err) throw err;
  });
  fs.writeFileSync('./output/Transform.txt', "", 'utf8', (err) => {
    if(err) throw err; 
    //console.log('Data has been replaced!');
  });
}

var writeASTTree = function(lvl, type, value){
    
    //console.log(lvl);
    lvl = lvl - 0;
    var data = "";

    var i=0;
    while (i < lvl){
      //console.log(i);
      data += "--";
      i++;
    }

    
    data += "> [type: " + type + "; value: " + value + "]\n"; 
    fs.appendFileSync('./output/AST.txt', data, 'utf8', (err) => {
        if(err) throw err;
        //console.log('Data has been replaced!');
    });
}

var writeTransformTree = function(type, value){
    
    var data = "";

    data += "[type: " + type + "; value: " + value + "]\n"; 
    fs.appendFileSync('./output/Transform.txt', data, 'utf8', (err) => {
        if(err) throw err;
        //console.log('Data has been replaced!');
    });
}

var writeASM = function(data){

    //data += "[type: " + type + "; value: " + value + "]\n"; 
    fs.appendFileSync('./output/output.s', data, 'utf8', (err) => {
        if(err) throw err;
        //console.log('Data has been replaced!');
    });
}


//module.exports.startPoint = startPoint;
module.exports.clearFile = clearFile;
module.exports.writeASTTree = writeASTTree;
module.exports.writeTransformTree = writeTransformTree;
module.exports.writeASM = writeASM;



