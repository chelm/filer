peechee 
--------------------

A configurable tool that can save/get files directly to a local file system or an s3 bucket. 

## Install 

    npm install peechee 

## Usage 

    # An example that uses the local file system:

    var Peechee = require('Peechee');
    
    var Peechee = new Peechee({
      type: 'local',
      dir: '/usr/local/files'
    });

    var obj = { data: [1,2,3] };

    // write the data to a file 
    peechee.write( JSON.stringify( obj ), 'path/to/subdir', 'new-file.json', function( err, res ){
      console.log( err, res );
    });

    // get the path to the file (not the raw data, just a pointer to file)
    // this can be used check if a file exists 
    peechee.path( 'path/to/subdir', 'new-file.json', function( err, data ){
      console.log( err, data );
    });

    // get the raw data in the file 
    peechee.read( 'path/to/subdir', 'new-file.json', function( err, data ){
      console.log( err, JSON.parse(data) );
    });

## Using S3 for storage 

To configure peechee to use S3 you can either first export your AWS keys to your local environemt vars: 

    > export AWS_ACCESS_KEY_ID='AKID'
    > export AWS_SECRET_ACCESS_KEY='SECRET' 

Or you can pass the keys directly to Peechee


    var Peechee = require('Peechee');
    
    var peechee = new Peechee({
      type: 's3',
      dir: 'my-bucket',
      aws_key_id: 'akid',
      aws_secret_access_key: 'sekritkey',
      region: 'us-west-2' // optional
    });

    var obj = { data: [1,2,3] };

    // write the data to a file 
    peechee.write( JSON.stringify( obj ), 'path/to/subdir', 'new-file.json', function( err, res ){
      console.log( err, res );
    });

After that the API is the same as the local file system methods 


## Test

    grunt test 
    
