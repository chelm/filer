
module.exports.write = function( content, dir, file, callback ){
  
  var s3 = new this.AWS.S3({params: {Bucket: [this.dir, dir].join('/'), Key: file}});

  s3.createBucket(function() {
    s3.putObject({Body: content}, function( err ) {
      callback( err );
    });
  });

};

// returns a URL to file from s3 
module.exports.path = function( dir, file, callback ){

  var s3 = new this.AWS.S3();
  var params = { Bucket: [this.dir, dir].join('/'), Key: file };

  s3.getObjectAcl(params, function(err, res){
    if (err){
      callback( err.message );
    } else {
      s3.getSignedUrl( 'getObject', params, function ( err, url ) {
        callback( err, url );
      });
    }
  });

};

// returns a URL to file from s3 
module.exports.read = function( dir, file, callback ){

  var s3 = new this.AWS.S3();
  var params = { Bucket: [this.dir, dir].join('/'), Key: file };

  s3.getObject( params, function ( err, data ) {
    if ( err ){
      callback(err.message, null);
    } else {
      callback( err, data.Body.toString() );
    }
  });

};

