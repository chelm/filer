var AWS = require('aws-sdk');


// A simple fn that sets up scope vars from inputs
// loads in the correct lib based on the input type 
Peechee = function( config, callback ){

  // makes these accessible to our sub-methods
  this.type = config.type;
  this.dir = config.dir;
  
  if ( this.type == 'local' ){
    // load the local module and add its save and get methods
    var local = require('./lib/local.js');
    this.write = local.write;
    this.path = local.path;
    this.read = local.read;

  } else if ( this.type == 's3' ){
    this.AWS = AWS; 

    // set the region for the s3 bucket 
    this.AWS.config.region = config.region || 'us-west-2';

    // load the local module and add its save and get methods
    var s3 = require('./lib/s3.js');
    this.write = s3.write;
    this.path = s3.path;
    this.read = s3.read;
  }

  // if we have a callback, pass this to it
  if ( callback ){
    callback( null, this );
  }
  
  return this;
};

module.exports = Peechee;
