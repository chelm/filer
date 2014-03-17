Filer 
--------------------

A configurable tool that can save/get files directly to a local file system or an s3 bucket. 


An example that uses the local file system:

    `javascript 

      var Filer = require('Filer');
      
      var filer = new Filer({
        type: 'local',
        dir: '/usr/local/files'
      });

      var obj = { data: [1,2,3] };

      filer.save( JSON.stringify( obj ), 'new-file.json', function( err, res ){
        console.log( err, res );
      });

      filer.get( 'new-file.json', function( err, data ){
        console.log( err, JSON.parse( data ) );
      });
      

    ` 
