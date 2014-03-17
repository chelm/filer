// A simple fn that sets up scope vars from inputs
// loads in the correct lib based on the input type 

Filer = function( config, callback ){

  // makes these accessible to our sub-methods
  this.type = config.type;
  this.dir = config.dir;
  
  if ( this.type == 'local' ){

    // load the local module and add its save and get methods
    var local = require('./lib/local.js');
    this.save = local.save;
    this.get = local.get;

  } else if ( this.type == 's3' ){
    
    // load the local module and add its save and get methods
    var s3 = require('./lib/s3.js');
    this.save = s3.save;
    this.get = s3.get;

  }

  // if we have a callback, pass this to it
  if ( callback ){
    callback( null, this );
  }
  
  return this;
};

module.exports = Filer;
