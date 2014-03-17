var fs = require('node-fs');

module.exports.save = function(content, dir, file, callback){
  var path = [ this.dir, dir ].join('/');
  fs.mkdir( path, '0755', true, function(err, res){
    fs.writeFile( path +'/'+ file, content, callback );
  });
};

module.exports.get = function(dir, file, callback){
  fs.readFile([ this.dir, dir, file ].join('/'), callback);
};

