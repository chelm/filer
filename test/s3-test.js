var vows   = require('vows'),
  fs = require('node-fs'),
  assert = require('assert');

var Peechee = require('../');

var params = {
  type: 's3',
  dir: 'koop-dev'
};

var data = { peechee: [ 1,2,3,4 ] };

var peechee; 

vows.describe('An s3 peechee').addBatch({
  'When saving data to s3': {
    topic: function () {
      peechee = new Peechee(params);
      peechee.write( JSON.stringify( data ), '', 'remote.json', this.callback );
    },
    'It should successfully write the data to an s3 bucket': function (err) {
      assert.equal( err, null );
    }
  },
  'When saving data to a local file in a subdir from the base': {
    topic: function () {
      peechee = new Peechee( params );
      peechee.write( JSON.stringify( data ), 'dir1/dir2', 'remote.json', this.callback );
    },
    'It should successfully write the data to s3 bucket w/subdir': function (err, res) {
      assert.equal(err, null);
    }
  },
  'When reading data from a local file': {
    topic: function () {
      peechee = new Peechee( params );
      var self = this;
      setTimeout(function(){
        peechee.read( '', 'remote.json', self.callback );
      }, 100);
    },
    'It should successfully read the data from a local file': function (err, res) {
      assert.equal(err, null);
    }
  },
  'When trying to read data from a non-existant file': {
    topic: function () {
      peechee = new Peechee( params );
      peechee.read( '', 'remoteZZZ.json', this.callback );
    },
    'It should err': function (err, res) {
      assert.equal(typeof(err), 'string');
    }
  },

  'When trying to get the path for a non-existant file': {
    topic: function () {
      peechee = new Peechee( params );
      peechee.path( '', 'remoteZZZ.json', this.callback );
    },
    'It should err': function (err, res) {
      assert.equal(typeof(err), 'string');
    }
  },

  'When trying to get the path for a remote file': {
    topic: function () {
      peechee = new Peechee( params );
      peechee.path( '', 'remote.json', this.callback );
    },
    'It should err': function (err, res) {
      assert.equal(err, null);
    }
  }
}).export(module);
