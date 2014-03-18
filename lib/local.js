var fs = require('node-fs');

module.exports.write = function(content, dir, file, callback){
  var path = [ this.dir, dir ].join('/');
  fs.mkdir( path, '0755', true, function(err, res){
    fs.writeFile( path +'/'+ file, content, callback );
  });
};

module.exports.path = function(dir, file, callback){
  var path = [ this.dir, dir, file ].join('/');

  fs.exists( path, function( exists ){
    if ( !exists ){
      callback( 'File not found', null );
    } else {
      callback( null, path );
    }
  });
};

module.exports.read = function(dir, file, callback){
  fs.readFile([ this.dir, dir, file ].join('/'), function(err, data){ 
    if (err){
      callback( err.message );
    } else {
      callback( err, data );
    }
  });
};

