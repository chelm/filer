var fs = require('node-fs');

module.exports.save = function(content, dir, file, callback){
  
  fs.mkdir( [this.dir, dir].join('/'), '0755', true, function(err, res){
    fs.writeFile( file, content, callback );
  });

};

module.exports.get = function(){

};

